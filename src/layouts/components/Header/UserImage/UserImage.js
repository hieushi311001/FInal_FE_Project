import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
import "./UserImage.css";
function UserImage({ accountId, name, avatar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async (e) => {
    const userToken = Cookies.get("jwtToken");
    console.log(userToken);
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
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    Cookies.remove("userData", { path: "/" });
    Cookies.remove("jwtToken", { path: "/" });
    window.location.href = "/";
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
            src={`https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg`}
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
            <a className="dropdown-item" href={{}}>
              <i className="fa fa-cog"></i>
              Settings
            </a>
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
