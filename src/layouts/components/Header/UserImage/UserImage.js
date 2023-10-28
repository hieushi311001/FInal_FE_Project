import React, { useState } from "react";
import "./UserImage.css";
function UserImage({ name, avatar }) {
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
            src="https://media.gucci.com/style/HEXF1E9FB_Center_0_0_800x800/1669920431/724770_XKCWH_8050_002_100_0000_Light-Striped-jacquard-wool-knit-sweater.jpg"
            alt="Profile"
            className="rounded-circle"
          />
          <span className="username">{name}</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu show" id="userDropdown">
            <a className="dropdown-item" href={{}}>
              <i className="fa fa-user"></i>
              Profile
            </a>
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
