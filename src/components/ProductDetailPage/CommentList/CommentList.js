import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import { format } from "date-fns";
import PostComment from "./PostComment";
import CommentChild from "./CommentChild";
import "./CommentList.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function CommentList({ productId, color }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const [reply, setReply] = useState();
  const [count, setCount] = useState(5);
  const [rating, setRating] = useState(5);
  const userToken = Cookies.get("jwtToken");
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
        limit: count,
      },
    };
    const fetchData = async () => {
      try {
        const method = "POST";
        if (userToken) {
          const likeRequest = {
            productColor: color,
            productId: productId,
          };
          const axiosInstance = {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          };
          const likeRequestPath = "authen/comment/commentsYouLiked";
          const likeRequestResult = await makeRequest(
            method,
            likeRequestPath,
            likeRequest,
            axiosInstance
          );
          setLikedComments(likeRequestResult.content);
        }
        const path = "unauthen/comment/commentList";

        const result = await makeRequest(method, path, APIdata);
        console.log(result);
        const formattedComments = result.content.map((comment) => {
          const formattedDate = format(
            new Date(comment.commentDate),
            "HH:mm - dd/MMM/YYY"
          );

          return {
            ...comment,
            commentDate: formattedDate,
          };
        });

        setComments(formattedComments);
        // setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [color, productId, navigate, userToken, count, reply]);
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
  const handleLikeClick = (commentId) => {
    if (!userToken) {
      navigate("/login?redirect=true");
    }
    // Kiểm tra xem comment đã được like chưa
    const isLiked = likedComments.includes(commentId);

    // Nếu đã like, loại bỏ khỏi danh sách likedComments; ngược lại, thêm vào
    if (isLiked) {
      const fetchData = async () => {
        try {
          const method = "GET";
          const path = `authen/comment/react_comment_id=${commentId}`;
          const axiosInstance = {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          };
          const result = await makeRequest(method, path, null, axiosInstance);
          setLikedComments((prevLikedComments) =>
            prevLikedComments.filter((id) => id !== commentId)
          );
          const updatedComments = comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likeQuantity: comment.likeQuantity - 1 }
              : comment
          );
          console.log(result);
          setComments(updatedComments);
        } catch (error) {}
      };

      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const method = "GET";
          const path = `authen/comment/react_comment_id=${commentId}`;
          const axiosInstance = {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          };
          const result = await makeRequest(method, path, null, axiosInstance);
          setLikedComments((prevLikedComments) => [
            ...prevLikedComments,
            commentId,
          ]);
          const updatedComments = comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, likeQuantity: comment.likeQuantity + 1 }
              : comment
          );
          console.log(result);
          setComments(updatedComments);
        } catch (error) {}
      };

      fetchData();
    }
  };
  const handleMoreComment = () => {
    setCount((prevCount) => prevCount + 5);
  };
  const handleCommentClick = (commentId) => {
    console.log(commentId);
    setReply(commentId);
  };
  const handleStarClick = (starNumber) => {
    // Update the rating state when a star is clicked
    setRating(starNumber);

    // TODO: Save the rating to your backend or perform any other necessary actions
    console.log(`Rated ${starNumber} stars`);
  };
  const handleRating = () => {
    const fetchData = async () => {
      try {
        if (userToken) {
          const method = "POST";
          const apiData = {
            productId: productId,
            color: color,
            overallRating: rating,
          };
          const axiosInstance = {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          };
          const apiPath = "authen/shop/rateProduct";
          const apiResult = await makeRequest(
            method,
            apiPath,
            apiData,
            axiosInstance
          );
          console.log(apiResult);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  return (
    <div className="tab-pane fade" id="tab-3" role="tabpanel">
      <div className="customer-review-option">
        <div className="personal-rating">
          <h4>Your Rating</h4>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <i
                key={starNumber}
                className={`fa ${
                  starNumber <= rating ? "fa-star" : "fa-star-o"
                }`}
                style={{ fontSize: " 20px" }}
                onClick={() => handleStarClick(starNumber)}
              />
            ))}
            <button
              type="submit"
              className="site-btn"
              style={{ backgroundColor: "#e7ab3c", marginLeft: "15px" }}
              onClick={handleRating}
            >
              Rating
            </button>
          </div>
        </div>
        <PostComment
          productId={productId}
          color={color}
          handleSubmitCheck={handleCommentClick}
        />
        <h4 style={{ marginTop: "30px" }}>5 Comments</h4>
        <div className="comment-option ">
          <div className="row justify-content-center h-100 w-100 ">
            <div className="card custom-1">
              <div className="card-body p-4">
                <h4 className="text-center mb-4 pb-2">
                  Nested comments section
                </h4>
                <div className="row">
                  <div className="col">
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
                              {comment.commentContent}
                            </p>
                            <div className="bg-white">
                              <div className="d-flex flex-row fs-12">
                                <div
                                  className="like p-2 cursor"
                                  style={{ color: "#e7ab3c" }}
                                >
                                  <i className="fa fa-thumbs-up" />
                                  <span className="ml-1">
                                    {comment.likeQuantity}
                                  </span>
                                </div>
                                <div
                                  className="like p-2 cursor"
                                  onClick={() => handleLikeClick(comment.id)}
                                  style={
                                    likedComments.includes(comment.id)
                                      ? {
                                          color: "#e7ab3c",

                                          fontWeight: "bold",
                                        }
                                      : null
                                  }
                                >
                                  <i className="fa fa-thumbs-o-up" />
                                  <span className="ml-1">Like</span>
                                </div>
                                <div
                                  className="like p-2 cursor"
                                  onClick={() => handleCommentClick(comment.id)}
                                >
                                  <i className="fa fa-commenting-o" />
                                  <span className="ml-1">Comment</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {reply === comment.id ? (
                              <PostComment
                                commentId={reply}
                                productId={productId}
                                color={color}
                                handleSubmitCheck={handleCommentClick}
                              />
                            ) : null}
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
                                  Close Comment
                                </span>
                              </div>
                            ) : (
                              <span
                                className="read-more"
                                onClick={() => handleShowReplies(comment.id)}
                              >
                                <i className="bi bi-arrow-return-right" />
                                Another Comment
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="read-more" onClick={handleMoreComment}>
                  <i>More Comment...</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
