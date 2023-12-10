import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { makeRequest } from "~/services";
function CommentChild({ id, productId, color }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Define the API endpoint you want to call
    const APIdata = {
      filter: {
        productId: productId,
        productColor: color,
        replyOn: 1, // sử dụng khi cần lấy danh sách bình luận của reply của 1 bình luận nào có id là 1
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
  }, [id, color, productId]);
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
                <div className="like p-2 cursor">
                  <i className="fa fa-thumbs-o-up" />
                  <span className="ml-1">Like</span>
                </div>
                <div className="like p-2 cursor">
                  <i className="fa fa-commenting-o" />
                  <span className="ml-1">Comment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentChild;
