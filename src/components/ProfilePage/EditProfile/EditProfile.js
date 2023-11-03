import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import ProfilePage from "../ProfilePage";
import { makeRequest } from "~/services";
import axios from "axios";
function EditProfile() {
  const params = useParams();
  const [cookieData, setCookieData] = useState({});
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    // Lấy giá trị từ cookie khi component được mount
    // const userDataCookie = Cookies.get("userData");
    // const storedUserData = JSON.parse(userDataCookie);
    // if (storedUserData) {
    //   setCookieData(storedUserData);
    // }
    const userDataCookie = Cookies.get("userData");

    const storedUserData = JSON.parse(userDataCookie);
    console.log("2 ", storedUserData);
    setCookieData(storedUserData);
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileURL = e.target.result;
        setFileName(fileURL);
        console.log("URL của tệp đã chọn:", fileURL);
        // Bây giờ bạn có thể sử dụng giá trị fileURL trong ứng dụng của bạn
      };

      reader.readAsDataURL(file);
      // Cập nhật tấm ảnh đã chọn để hiển thị
      setSelectedFile(URL.createObjectURL(file));
    }
  };
  const handleChangeImage = (event) => {
    event.preventDefault();
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Token nè: ", userToken);
    const yourData = {
      fileUpload: fileName,
      filePath: "CustomerAvatar",
      shared: "true",
    };
    const fetchData = async () => {
      try {
        const path = "authen/googleDrive/upLoadCustomerAvatar";
        const method = "POST";
        const result = await makeRequest(method, path, yourData, axiosInstance);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const formData = new FormData();
    formData.append("fileUpload", fileName); // yourFile là đối tượng tệp đã chọn
    formData.append("filePath", "CustomerAvatar");
    formData.append("shared", "true");

    fetch("https://localhost:8080/authen/googleDrive/upLoadCustomerAvatar", {
      method: "POST",
      mode: "no-cors", // Chỉnh lại mode thành "cors"
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjk4OTQwMzIwLCJleHAiOjE2OTkwMjY3MjB9.Qh6x8GtWYqKOcuMECVmA_KHGIiSfMpYe6_3ka8rh9eA",
      },
      credentials: "include", // Tùy thuộc vào cấu hình máy chủ
      body: formData, // Sử dụng formData thay vì yourData
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Lỗi trong quá trình gửi yêu cầu");
        }
      })
      .then((data) => {
        // Xử lý dữ liệu từ phản hồi
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu formData đến API ở đây (sử dụng fetch hoặc axios).
    // Ví dụ:
    const userToken = Cookies.get("jwtToken");
    const options = {
      headers: {
        // Authorization: `Bearer ${userToken}`,
        // Các tiêu đề khác nếu cần
      },
    };
    console.log(cookieData);
    for (var key in formData) {
      if (cookieData.hasOwnProperty(key)) {
        cookieData[key] = formData[key];
      }
    }
    Cookies.set("userData", JSON.stringify(cookieData));
    console.log("tesst: ", Cookies.get("userData"));
    const fetchData = async () => {
      try {
        const path = "unauthen/systemAuthentication/updateProfile";
        const method = "POST";
        const result = await makeRequest(method, path, formData, options);
        // window.location.reload();
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };

  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {selectedFile ? (
                <div>
                  <img
                    className="img-account-profile rounded-circle-1 mb-2"
                    src={selectedFile}
                    alt="Tấm ảnh đã chọn"
                  />
                </div>
              ) : (
                <img
                  className="img-account-profile rounded-circle-1 mb-2"
                  src={`https://drive.google.com/uc?export=view&id=${cookieData.avatar}`}
                  alt=""
                />
              )}

              <div className="small font-italic text-muted mb-4">
                {cookieData.name}
              </div>
              <button
                onClick={handleFileUpload}
                className="btn btn-primary"
                type="button"
              >
                Upload new image
              </button>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "15px" }}
                type="submit"
                onClick={handleChangeImage}
              >
                Save
              </button>
              {console.log("Ảnh: ", fileInputRef)}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelected}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              {/* onSubmit={handleSubmit} */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    name="name"
                    type="text"
                    placeholder={cookieData.name}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    name="email"
                    type="email"
                    placeholder={cookieData.email}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className="form-control"
                    id="inputPhone"
                    name="phoneNumber"
                    type="number"
                    placeholder={cookieData.phoneNumber}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1" htmlFor="inputOrgName">
                      Address
                    </label>
                    <input
                      className="form-control"
                      id="inputOrgName"
                      type="text"
                      name="address"
                      placeholder={cookieData.address}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1" htmlFor="inputLocation">
                      City
                    </label>
                    <input
                      className="form-control"
                      id="inputLocation"
                      name="city"
                      type="text"
                      placeholder={cookieData.city}
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1" htmlFor="inputLocation">
                      Country
                    </label>
                    <input
                      className="form-control"
                      id="inputLocation"
                      type="text"
                      name="country"
                      value={formData.country}
                      placeholder={cookieData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
