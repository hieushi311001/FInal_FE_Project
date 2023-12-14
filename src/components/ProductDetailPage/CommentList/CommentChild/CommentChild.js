import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import PostComment from "../PostComment";
function CommentChild({ id, productId, color }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const [reply, setReply] = useState();
  const [count, setCount] = useState(5);
  const [rating, setRating] = useState(0);
  const userToken = Cookies.get("jwtToken");
  useEffect(() => {
    // Define the API endpoint you want to call
    const APIdata = {
      filter: {
        productId: productId,
        productColor: color,
        replyOn: id, // sử dụng khi cần lấy danh sách bình luận của reply của 1 bình luận nào có id là 1
      },
      pagination: {
        page: 1,
        limit: 5,
      },
    };
    const fetchData = async () => {
      try {
        const method = "POST";
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
  }, [id, color, productId, reply]);
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
  const handleCommentClick = (commentId) => {
    console.log(commentId);
    setReply(commentId);
  };
  return (
    <div>
      {comments.map((comment) => (
        <div className="d-flex flex-start mt-2">
          <a className="me-3" href={{}}>
            <img
              className="rounded-circle shadow"
              src={`https://drive.google.com/uc?export=view&id=${comment.avatar}`}
              alt="avatar"
              width={65}
              height={65}
            />
          </a>
          <div className="flex-grow-1 flex-shrink-1 my-custom-margin">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1">
                  {comment.name}
                  <span className="small-1">- {comment.commentDate}</span>
                </p>
              </div>
              <p className="rounded-box small mb-0">{comment.commentContent}</p>
            </div>
            <div className="bg-white">
              <div className="d-flex flex-row fs-12">
                <div className="like p-2 cursor" style={{ color: "#e7ab3c" }}>
                  <i className="fa fa-thumbs-up" />
                  <span className="ml-1">{comment.likeQuantity}</span>
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
              {reply === comment.id ? (
                <PostComment
                  commentId={reply}
                  productId={productId}
                  color={color}
                  handleSubmitCheck={handleCommentClick}
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentChild;
