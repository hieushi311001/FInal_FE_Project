import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { showSuccessNotification, showErrorNotification } from "~/services";

function PopupPage({ isOpen, onClose, id }) {
  console.log(id);
  const navigate = useNavigate();
  const [imgSelectedFile, setImgSelectedFile] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImgSelectedFile(file);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const path = "authen/refund/confirmRefund";
    const method = "POST";

    const userToken = Cookies.get("jwtTokenAdmin");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("invoiceId", id);
    formData.append("evidenceImage", imgSelectedFile);
    try {
      if (!imgSelectedFile) {
        // Kiểm tra xem người dùng đã chọn tệp hay chưa
        console.error("Please choose a file.");
        return;
      }
      const result = await makeRequest(method, path, formData, axiosInstance);
      console.log(result);
      navigate(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Call the onClose function to close the modal
  };
  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      <div className="custom-modal">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        {console.log(imgSelectedFile)}
        <label htmlFor="fileInput">Choose an image:</label>
        <input type="file" onChange={handleFileUpload} />
        <button
          className="btn btn-primary change"
          type="submit"
          style={{
            backgroundColor: "#e7ab3c",
            border: "2px solid #e7ab3c",
            width: "15%",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block", // Ensures the button is a block-level element
          }}
          onClick={handleConfirm}
        >
          Save
        </button>
      </div>
    </Popup>
  );
}

export default PopupPage;
