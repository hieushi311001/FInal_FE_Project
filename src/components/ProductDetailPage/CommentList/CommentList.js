import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import { format } from "date-fns";
import PostComment from "./PostComment";
import CommentChild from "./CommentChild";
import "./CommentList.css";
function CommentList({ productId, color }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Define the API endpoint you want to call
    const APIdata = {
      filter: {
        productId: productId,
        productColor: color,
        replyOn: 0, // sử dụng khi cần lấy danh sách bình luận của reply của 1 bình luận nào có id là 1
      },
      pagination: {
        page: 1,
        limit: 5,
      },
    };
    // console.log("test nè: ", productId, "và: ", color);
    const fetchData = async () => {
      try {
        const path = "unauthen/comment/commentList";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata);
        const formattedComments = result.content.map((comment) => ({
          ...comment,
          commentDate: format(new Date(comment.commentDate), "dd MMM yyyy"),
        }));
        setComments(formattedComments);
        // setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [color, productId]);
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: true,
    }));
  };

  const handleHideReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: false,
    }));
  };

  return (
    // <div className="tab-pane fade" id="tab-3" role="tabpanel">
    //   <div className="customer-review-option">
    //     <h4>5 Comments</h4>
    //     <div className="comment-option">
    //       {/* <div className="co-item">
    //         <div className="avatar-pic">
    //           <img src="img/product-single/avatar-1.png" alt="" />
    //         </div>
    //         <div className="avatar-text">
    //           <div className="at-rating">
    //             <i className="fa fa-star" />
    //             <i className="fa fa-star" />
    //             <i className="fa fa-star" />
    //             <i className="fa fa-star" />
    //             <i className="fa fa-star-o" />
    //           </div>
    //           <h5>
    //             Brandon Kelley <span>27 Aug 2019</span>
    //           </h5>
    //           <div className="at-reply">Nice !</div>
    //         </div>
    //       </div> */}
    //       {/* {console.log(comments)} */}
    //       {comments.map((comment) => (
    //         <div className="co-item">
    //           <div className="avatar-pic">
    //             <img
    //               src={`https://drive.google.com/uc?export=view&id=${comment.avatar}`}
    //               alt=""
    //             />
    //           </div>
    //           <div className="avatar-text">
    //             <div className="at-rating">
    //               <i className="fa fa-star" />
    //               <i className="fa fa-star" />
    //               <i className="fa fa-star" />
    //               <i className="fa fa-star" />
    //               <i className="fa fa-star-o" />
    //             </div>
    //             <h5>
    //               {comment.name} <span>{comment.commentDate}</span>
    //             </h5>
    //             <div className="at-reply">{comment.commentContent}</div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     {/* <div className="personal-rating">
    //       <h6>Your Ratind</h6>
    //       <div className="rating">
    //         <i className="fa fa-star" />
    //         <i className="fa fa-star" />
    //         <i className="fa fa-star" />
    //         <i className="fa fa-star" />
    //         <i className="fa fa-star-o" />
    //       </div>
    //     </div> */}
    //     <PostComment productId={productId} color={color} />
    //   </div>
    // </div>
    <div className="tab-pane fade" id="tab-3" role="tabpanel">
      <div className="customer-review-option">
        <h4>5 Comments</h4>
        <div className="comment-option ">
          <div className="row justify-content-center h-100 w-100 ">
            <div className="card custom-1">
              <div className="card-body p-4">
                <h4 className="text-center mb-4 pb-2">
                  Nested comments section
                </h4>
                <div className="row">
                  <div className="col">
                    {console.log(comments)}
                    {comments.map((comment) => (
                      <div
                        className="d-flex flex-start custom-margin"
                        key={comment.id}
                      >
                        <img
                          className="rounded-circle shadow me-3"
                          src={`https://drive.google.com/uc?export=view&id=${comment.avatar}`}
                          alt="avatar"
                          width={65}
                          height={65}
                        />
                        <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">
                                {comment.name}
                                <span className="small-1">
                                  - {comment.commentDate}
                                </span>
                              </p>
                            </div>
                            <p className="rounded-box small mb-0">
                              {/* It is a long established fact that a reader will
                              be distracted by the readable content of a page. */}
                              {comment.commentContent}
                            </p>
                            <div className="bg-white">
                              <div className="d-flex flex-row fs-12">
                                <div className="like p-2 cursor">
                                  <i className="fa fa-thumbs-o-up" />
                                  <span className="ml-1">Like</span>
                                </div>
                                <div className="like p-2 cursor">
                                  <i className="fa fa-commenting-o" />
                                  <span className="ml-1">Comment</span>
                                </div>
                                <div className="like p-2 cursor">
                                  <i className="fa fa-share" />
                                  <span className="ml-1">Share</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {showReplies[comment.id] ? (
                              <div>
                                <CommentChild
                                  id={comment.id}
                                  productId={comment.productId}
                                  color={comment.productColor}
                                />
                                <span
                                  className="read-more"
                                  onClick={() => handleHideReplies(comment.id)}
                                >
                                  <i className="bi bi-arrow-return-right" />
                                  Ẩn phản hồi
                                </span>
                              </div>
                            ) : (
                              <span
                                className="read-more"
                                onClick={() => handleShowReplies(comment.id)}
                              >
                                <i className="bi bi-arrow-return-right" />
                                Xem thêm phản hồi
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
