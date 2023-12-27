import { Link } from "react-router-dom";
import React, { useState } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
function ForgetPassPage() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const path = "unauthen/systemAuthentication/forgotPassword";
    const params = { userName, email };
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
        window.location.href = "/login";
      }
    } catch (error) {
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
                <Link to={`/login`}>
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Reset Password</span>
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
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                  <div className="group-input">
                    <label htmlFor="username">Username *</label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="pass">Your Account Email *</label>
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="site-btn login-btn">
                    Reset Password
                  </button>
                </form>
                <div className="switch-login">
                  <Link to={`/login`} className="or-login">
                    Or Login
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

export default ForgetPassPage;
