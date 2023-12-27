import "./AdminLoginPage.css";
import images from "~/assets/images";
import { makeRequest, initializeMessaging } from "~/services";
import { useState } from "react";
import Cookies from "js-cookie";
function AdminLoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const path = "unauthen/systemAuthentication/login";
    const params = { userName, password };
    const method = "POST";
    try {
      const result = await makeRequest(method, path, params);
      console.log(result);
      if (result.result === "success" && result.content.userName === "admin") {
        const topic = result.content.userName;
        initializeMessaging(topic, "subscribe");
        Cookies.set("jwtTokenAdmin", result.message); // Set an expiration date
        Cookies.set("userDataAdmin", JSON.stringify(result.content));
        window.location.href = "/admin";
      }
    } catch (error) {
      console.log("Login error:", error.response);
    }
  };
  return (
    <>
      <div className="home-btn d-none d-sm-block">
        <a href="index.html">
          <i className="fa fa-home h2" />
        </a>
      </div>
      <div className="account-pages my-5 pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div>
                <div className="text-center authentication-logo mb-4">
                  <a href="index.html" className="logo-dark">
                    <span>
                      <img src={images.webLogo1} alt="" height={75} />
                    </span>
                  </a>
                </div>
                <form action="#">
                  <div className="form-group mb-3">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your email"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <a
                    href="page-recoverpw.html"
                    className="text-muted float-right"
                  >
                    Forgot your password?
                  </a>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox-signin"
                        defaultChecked=""
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="checkbox-signin"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="form-group text-center mb-3">
                    <button
                      className="btn btn-primary btn-lg width-lg btn-rounded"
                      type="submit"
                      onClick={handleLogin}
                    >
                      {" "}
                      Sign In{" "}
                    </button>
                  </div>
                </form>
              </div>

              <div className="row">
                <div className="col-sm-12 text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <a href="page-register.html" className="text-dark ml-1">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
