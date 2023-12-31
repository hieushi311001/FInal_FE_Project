import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { encodeAndSetCookie, initializeMessaging } from "~/services";
import "./UserImage.css";
function UserImage({ accountId, name, avatar }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const storedUserData = JSON.parse(userDataCookie);
      initializeMessaging(storedUserData.userName, "subscribe");
    }
  }, []);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = "/authen/systemAuthentication/logout";
        const method = "GET";
        await makeRequest(method, path, null, axiosInstance);
        const userDataCookie = Cookies.get("userData");
        const storedUserData = JSON.parse(userDataCookie);
        initializeMessaging(storedUserData.userName);
        encodeAndSetCookie("isLogin", "LoginFalse");
        Cookies.remove("userData");
        Cookies.remove("jwtToken");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  };
  return (
    <div>
      <div className="user-image-container">
        <div
          className="nav-link text-black"
          id="userDropdownBtn"
          onClick={toggleDropdown}
        >
          <img
            src={`https://drive.google.com/uc?export=view&id=${avatar}`}
            alt="Avatar"
            className="rounded-circle"
          />
          <span className="username">{name}</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu show" id="userDropdown">
            <Link className="dropdown-item" to={`/profile/${accountId}`}>
              <i className="fa fa-user"></i>
              Profile
            </Link>
            {/* <Link to={`/login`} className="login-panel">
              <i className="fa fa-user"></i>Login
            </Link> */}
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserImage;
