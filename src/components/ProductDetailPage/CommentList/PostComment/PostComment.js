import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
function PostComment({ productId, color }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = Cookies.get("jwtToken");
    console.log(userToken);
    // Gửi dữ liệu bình luận lên server với productId và color
    const APIdata = {
      commentContent: comment,
      productId: productId,
      productColor: color,
      replyOn: 1,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
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
        // setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  return (
    <div className="leave-comment">
      <h4>Leave A Comment</h4>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="row">
          <div className="col-lg-6">
            <input type="text" placeholder="Name" />
          </div>
          <div className="col-lg-6">
            <input type="text" placeholder="Email" />
          </div>
          <div className="col-lg-12">
            <textarea
              placeholder="Messages"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="site-btn">
              Send message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostComment;
