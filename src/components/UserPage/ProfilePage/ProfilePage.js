import "./ProfilePage.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const navigate = useNavigate();
  const [cookieData, setCookieData] = useState({});
  const [isChecked, setIsChecked] = useState(true);
  const [changePass, setChangePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleOldPassChange = (event) => {
    // Update the password state with the new input value
    setOldPassword(event.target.value);
  };
  const handleNewPassChange = (event) => {
    // Update the password state with the new input value
    setNewPassword(event.target.value);
  };
  const handleSave = (e) => {
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
        const path = `authen/systemAuthentication/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, options);
        console.log(result);
        navigate(0);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  };
  const handleChangePasword = () => {
    setChangePass(!changePass); // Khi nút được bấm, đảo ngược giá trị của biến isChecked.
  };
  const handleButtonClick = () => {
    setIsChecked(!isChecked); // Khi nút được bấm, đảo ngược giá trị của biến isChecked.
  };
  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    const storedUserData = JSON.parse(userDataCookie);
    setCookieData(storedUserData);
  }, []);
  return (
    <div className="container-xl px-4 mt-4">
      {isChecked ? (
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle-1 mb-2"
                  src={`https://drive.google.com/uc?export=view&id=${cookieData.avatar}`}
                  alt=""
                />
                <div className="small font-italic text-muted mb-4">
                  {cookieData.name}
                </div>
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

                  {changePass && (
                    <>
                      <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputPhone">
                          Old Password
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your old password"
                          value={oldPassword}
                          onChange={handleOldPassChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputPhone">
                          New Password
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={handleNewPassChange}
                        />
                      </div>
                    </>
                  )}
                  <button
                    onClick={handleButtonClick}
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "#e7ab3c",
                      border: "2px solid #e7ab3c",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleChangePasword}
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "#252525",
                      border: "2px solid #252525",
                      marginLeft: "10px",
                    }}
                  >
                    Change Password
                  </button>
                  {changePass && (
                    <button
                      onClick={handleSave}
                      className="btn btn-primary"
                      type="button"
                      style={{
                        backgroundColor: "#252525",
                        border: "2px solid #252525",
                        marginLeft: "10px",
                      }}
                    >
                      Save Password
                    </button>
                  )}
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
