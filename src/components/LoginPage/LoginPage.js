import config from "~/config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "~/services";
function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const path = "unauthen/systemAuthentication/login";
    const params = { userName, password };
    const method = "POST";
    try {
      const result = await makeRequest(method, path, params);
      console.log(result);
      if (result.result === "success") {
        console.log("Login successful!");

        // Chuyển hướng đến trang home page

        navigate(config.routes.home);
      }
    } catch (error) {
      console.log("Login error:", error.response.data);
    }
    // console.log(data);
  };

  return (
    <div>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href={{}}>
                  <i className="fa fa-home" /> Home
                </a>
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
                  <a href="./register.html" className="or-login">
                    Or Create An Account
                  </a>
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
