import config from "~/config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "~/services";
function RegisterPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const customer = {
      name,
      email,
      phoneNumber,
    };
    const path = "unauthen/systemAuthentication/register";
    const params = { userName, password, customer };
    const method = "POST";
    try {
      console.log(params);
      const result = await makeRequest(method, path, params);
      console.log(result);
      if (result.result === "success") {
        console.log("Register successful!");

        // Chuyển hướng đến trang home page

        navigate(config.routes.login);
      }
    } catch (error) {
      console.log("Register error:", error.response.data);
    }
  };
  return (
    <>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href={{}}>
                  <i className="fa fa-home" /> Home
                </a>
                <span>Register</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="register-login-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                    <label htmlFor="pass">Password *</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="text">Customer's Name *</label>
                    <input
                      type="text"
                      placeholder="Customer's Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="number">Number *</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="site-btn register-btn">
                    REGISTER
                  </button>
                </form>
                <div className="switch-login">
                  <a href={{}} className="or-login">
                    Or Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Register Form Section End */}
    </>
  );
}

export default RegisterPage;
