import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import {
  makeRequest,
  encodeAndSetCookie,
  initializeMessaging,
} from "~/services";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const params = useParams();
  const [cookieData, setCookieData] = useState({});
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgSelectedFile, setImgSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: null,
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    // Lấy giá trị từ cookie khi component được mount
    // const userDataCookie = Cookies.get("userData");
    // const storedUserData = JSON.parse(userDataCookie);
    // if (storedUserData) {
    //   setCookieData(storedUserData);
    // }
    const userDataCookie = Cookies.get("userData");
    const storedUserData = JSON.parse(userDataCookie);
    const numberValue = parseInt(params.profile_id, 10);
    setFormData({
      id: numberValue,
      email: cookieData.email,
      phoneNumber: cookieData.phoneNumber,
      address: cookieData.address,
      city: cookieData.city,
      country: cookieData.country,
      name: cookieData.name,
      avatar: cookieData.avatar,
      userName: cookieData.userName,
    });
    setCookieData(storedUserData);
  }, [
    cookieData.email,
    cookieData.phoneNumber,
    cookieData.address,
    cookieData.city,
    cookieData.country,
    cookieData.name,
    params.profile_id,
    cookieData.avatar,
    cookieData.userName,
  ]);
  console.log(formData);
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
        // Bây giờ bạn có thể sử dụng giá trị fileURL trong ứng dụng của bạn
      };

      reader.readAsDataURL(file);
      // Cập nhật tấm ảnh đã chọn để hiển thị
      setSelectedFile(URL.createObjectURL(file));
      setImgSelectedFile(file);
    }
  };
  const handleChangeImage = (event) => {
    event.preventDefault();
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("fileUpload", imgSelectedFile); // yourFile là đối tượng tệp đã chọn
    formData.append("filePath", "CustomerAvatar");
    formData.append("shared", "true");
    const fetchData = async () => {
      try {
        const path = "/authen/googleDrive/upLoadCustomerAvatar";
        const method = "POST";
        const result = await makeRequest(method, path, formData, axiosInstance);
        const userDataCookie = Cookies.get("userData");
        const storedUserData = JSON.parse(userDataCookie);
        storedUserData.avatar = result.content;
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        const jwtTokenCookie = Cookies.get("jwtToken");
        Cookies.set("jwtToken", jwtTokenCookie, { expires: expirationDate });
        Cookies.set("userData", JSON.stringify(storedUserData), {
          expires: expirationDate,
        });
        encodeAndSetCookie("isLogin", "LoginTrue", expirationDate);
        navigate(0);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu formData đến API ở đây (sử dụng fetch hoặc axios).
    // Ví dụ:
    const userToken = Cookies.get("jwtToken");
    const options = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        // Các tiêu đề khác nếu cần
      },
    };

    const fetchData = async () => {
      try {
        const path = "authen/systemAuthentication/updateProfile";
        const method = "POST";

        const result = await makeRequest(method, path, formData, options);
        console.log(result);
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        const jwtTokenCookie = Cookies.get("jwtToken");
        Cookies.set("jwtToken", jwtTokenCookie, { expires: expirationDate });
        Cookies.set("userData", JSON.stringify(formData), {
          expires: expirationDate,
        });
        encodeAndSetCookie("isLogin", "LoginTrue", expirationDate);
        navigate(0);
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
                className="btn btn-primary change"
                type="button"
                style={{
                  backgroundColor: "#e7ab3c",
                  border: "2px solid #e7ab3c",
                }}
              >
                Upload new image
              </button>
              <button
                className="btn btn-primary change"
                style={{
                  marginLeft: "15px",
                  backgroundColor: "#e7ab3c",
                  border: "2px solid #e7ab3c",
                }}
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
                    value={formData.name}
                    onChange={handleInputChange}
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
                <button
                  className="btn btn-primary change"
                  type="submit"
                  style={{
                    backgroundColor: "#e7ab3c",
                    border: "2px solid #e7ab3c",
                  }}
                >
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
