import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import { format } from "date-fns";
import PostComment from "./PostComment";
import "./CommentList.css";
function CommentList({ productId, color }) {
  // const [data, setData] = useState([]);
  // const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   // Define the API endpoint you want to call
  //   const APIdata = {
  //     filter: {
  //       productId: productId,
  //       productColor: color,
  //       replyOn: 0, // sử dụng khi cần lấy danh sách bình luận của reply của 1 bình luận nào có id là 1
  //     },
  //     pagination: {
  //       page: 1,
  //       limit: 5,
  //     },
  //   };
  //   // console.log("test nè: ", productId, "và: ", color);
  //   const fetchData = async () => {
  //     try {
  //       const path = "unauthen/comment/commentList";
  //       const method = "POST";
  //       const result = await makeRequest(method, path, APIdata);
  //       const formattedComments = result.content.map((comment) => ({
  //         ...comment,
  //         commentDate: format(new Date(comment.commentDate), "dd MMM yyyy"),
  //       }));
  //       setComments(formattedComments);
  //       // setData(result.content);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [color, productId]);
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
        <div className="comment-option">
          <div className="row justify-content-center h-100 w-100">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="text-center mb-4 pb-2">
                  Nested comments section
                </h4>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-start">
                      <img
                        className="rounded-circle shadow me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                        alt="avatar"
                        width={65}
                        height={65}
                      />
                      <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Maria Smantha
                              <span className="small">- 2 hours ago</span>
                            </p>
                            <a href={{}} className="custom">
                              <span className="small custom"> reply</span>
                            </a>
                          </div>
                          <p className="small mb-0">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page.
                          </p>
                        </div>
                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href={{}}>
                            <img
                              className="rounded-circle shadow"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                              alt="avatar"
                              width={65}
                              height={65}
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Simona Disa
                                  <span className="small">- 3 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                letters, as opposed to using 'Content here,
                                content here', making it look like readable
                                English.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href={{}}>
                            <img
                              className="rounded-circle shadow"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                              alt="avatar"
                              width={65}
                              height={65}
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  John Smith
                                  <span className="small">- 4 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                the majority have suffered alteration in some
                                form, by injected humour, or randomised words.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-start custom-margin">
                      <img
                        className="rounded-circle shadow me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                        alt="avatar"
                        width={65}
                        height={65}
                      />
                      <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                              Maria Smantha
                              <span className="small">- 2 hours ago</span>
                            </p>
                            <a href="#!">
                              <span className="small custom"> reply</span>
                            </a>
                          </div>
                          <p className="small mb-0">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page.
                          </p>
                        </div>
                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href={{}}>
                            <img
                              className="rounded-circle shadow"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                              alt="avatar"
                              width={65}
                              height={65}
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  Simona Disa
                                  <span className="small">- 3 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                letters, as opposed to using 'Content here,
                                content here', making it look like readable
                                English.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-start mt-4">
                          <a className="me-3" href={{}}>
                            <img
                              className="rounded-circle shadow"
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                              alt="avatar"
                              width={65}
                              height={65}
                            />
                          </a>
                          <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-1">
                                  John Smith
                                  <span className="small">- 4 hours ago</span>
                                </p>
                              </div>
                              <p className="small mb-0">
                                the majority have suffered alteration in some
                                form, by injected humour, or randomised words.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
