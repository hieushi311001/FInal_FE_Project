import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import EditProfile from "./EditProfile";
function ProfilePage() {
  const [cookieData, setCookieData] = useState({});
  const params = useParams();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });
  const [isChecked, setIsChecked] = useState(true);
  const handleButtonClick = () => {
    setIsChecked(!isChecked); // Khi nút được bấm, đảo ngược giá trị của biến isChecked.
  };
  useEffect(() => {
    // Lấy giá trị từ cookie khi component được mount
    // const userDataCookie = Cookies.get("userData");
    // const storedUserData = JSON.parse(userDataCookie);
    // if (storedUserData) {
    //   setCookieData(storedUserData);
    // }
    const userDataCookie = Cookies.get("userData");
    const storedUserData = JSON.parse(userDataCookie);
    console.log("1 ", storedUserData);
    setCookieData(storedUserData);
  }, []);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Cập nhật tấm ảnh đã chọn để hiển thị
      setSelectedFile(URL.createObjectURL(file));
    }
  };
  return (
    // {isChecked ? (

    // ) : (
    //   <div>
    //     {/* Giao diện khi isChecked là false */}
    //     <h1>Giao diện khi isChecked là False</h1>
    //     <p>Nội dung khi isChecked là False</p>
    //   </div>
    // )}
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      {isChecked ? (
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* {selectedFile ? (
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
          )} */}

                <img
                  className="img-account-profile rounded-circle-1 mb-2"
                  src={`https://drive.google.com/uc?export=view&id=${cookieData.avatar}`}
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  {cookieData.name}
                </div>
                {/* <button
            onClick={handleFileUpload}
            className="btn btn-primary"
            type="button"
          >
            Upload new image
          </button> */}
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
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      defaultValue={cookieData.name}
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
                      type="email"
                      placeholder="Enter your email address"
                      defaultValue={cookieData.email}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      defaultValue={cookieData.phoneNumber}
                      readOnly
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
                        placeholder="Address"
                        defaultValue={cookieData.address}
                        readOnly
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="small mb-1" htmlFor="inputLocation">
                        City
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        defaultValue={cookieData.city}
                        readOnly
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
                        readOnly
                        defaultValue={cookieData.country}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="btn btn-primary"
                    type="button"
                  >
                    Edit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EditProfile />
      )}
    </div>
  );
}

export default ProfilePage;
