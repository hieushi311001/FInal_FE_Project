import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
function PostComment({ commentId, productId, color, handleSubmitCheck }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentId) {
      const userToken = Cookies.get("jwtToken");
      const APIdata = {
        commentContent: comment,
        productId: productId,
        productColor: color,
        replyOn: commentId,
      };
      const options = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // "Content-Type": "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // Các tiêu đề khác nếu cần
        },
      };
      const fetchData = async () => {
        try {
          const path = "authen/comment/add";
          const method = "POST";
          const result = await makeRequest(method, path, APIdata, options);

          console.log(APIdata);
          handleSubmitCheck(Math.random());
          // setData(result.content);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      const userToken = Cookies.get("jwtToken");
      console.log(userToken);
      // Gửi dữ liệu bình luận lên server với productId và color
      const APIdata = {
        commentContent: comment,
        productId: productId,
        productColor: color,
      };
      const options = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // "Content-Type": "application/json",
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // Các tiêu đề khác nếu cần
        },
      };
      const fetchData = async () => {
        try {
          const path = "authen/comment/add";
          const method = "POST";
          const result = await makeRequest(method, path, APIdata, options);
          console.log(result);
          handleSubmitCheck(Math.random());
          // setData(result.content);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  };
  return (
    <div className="leave-comment">
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="row">
          <div className="col-lg-12">
            <textarea
              placeholder="Messages"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="site-btn"
              style={{ marginRight: "15px" }}
            >
              Comment
            </button>
            <button
              type="submit"
              className="site-btn"
              style={{ backgroundColor: "black" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostComment;
PostComment.propTypes = {
  handleSubmitCheck: PropTypes.func.isRequired,
};
