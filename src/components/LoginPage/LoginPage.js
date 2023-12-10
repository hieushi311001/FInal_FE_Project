import React, { useState } from "react";
import { makeRequest } from "~/services";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { encodeAndSetCookie } from "~/services";
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
      console.log(result);
      if (result.result === "success") {
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);

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
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Login error:", error.response.data);
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
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="pass">Password *</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="group-input gi-check">
                    <div className="gi-more">
                      <label htmlFor="save-pass">
                        Save Password
                        <input type="checkbox" id="save-pass" />
                        <span className="checkmark" />
                      </label>
                      <a href={{}} className="forget-pass">
                        Forget your Password
                      </a>
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
