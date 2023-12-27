import React, { useState } from "react";
import { makeRequest } from "~/services";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import {
  encodeAndSetCookie,
  initializeMessaging,
  showErrorNotification,
} from "~/services";
import { useLocation, useNavigate } from "react-router-dom";
function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const redirectParam = new URLSearchParams(location.search).get("redirect");

  const handleLogin = async (e) => {
    e.preventDefault();
    const path = "unauthen/systemAuthentication/login";
    const params = { userName, password };
    const method = "POST";
    try {
      const result = await makeRequest(method, path, params);
      if (result.result === "success") {
        const topic = result.content.userName;
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        initializeMessaging(topic, "subscribe");
        Cookies.set("jwtToken", result.message, { expires: expirationDate }); // Set an expiration date
        Cookies.set("userData", JSON.stringify(result.content), {
          expires: expirationDate,
        });
        encodeAndSetCookie("isLogin", "LoginTrue", expirationDate);

        if (redirectParam === "true") {
          // Đã truyền giá trị redirectParam
          navigate(-1);
        } else {
          // Không có hoặc giá trị là false
          window.location.href = "/";
        }
      }
    } catch (error) {
      showErrorNotification("Login fails", "Please check the information!");
      console.log("Login error:", error.response);
    }
  };

  return (
    <div>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <Link to={`/`}>
                  <i className="fa fa-home" /> Home
                </Link>

                <span>Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="register-login-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="group-input">
                    <label htmlFor="username">
                      Username or email address *
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      autoComplete="username"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="pass">Password *</label>
                    <input
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="group-input gi-check">
                    <div className="gi-more">
                      {/* <label htmlFor="save-pass">
                        Save Password
                        <input type="checkbox" id="save-pass" />
                        <span className="checkmark" />
                      </label> */}
                      <Link to={`/reset_password`} className="forget-pass">
                        Forget your Password
                      </Link>
                    </div>
                  </div>
                  <button type="submit" className="site-btn login-btn">
                    Sign In
                  </button>
                </form>
                <div className="switch-login">
                  <Link to={`/register`} className="or-login">
                    Or Create An Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
