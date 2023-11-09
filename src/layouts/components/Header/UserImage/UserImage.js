import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserImage.css";
function UserImage({ accountId, name, avatar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
            <a className="dropdown-item" href={{}}>
              <i className="fa fa-sign-out"></i>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserImage;
