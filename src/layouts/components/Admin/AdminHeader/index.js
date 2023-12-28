import images from "~/assets/images";
import "./AdminHeader.css";
import Cookies from "js-cookie";
import { makeRequest, initializeMessaging } from "~/services";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Header() {
  useEffect(() => {
    const userDataCookie = Cookies.get("userDataAdmin");
    if (userDataCookie) {
      const storedUserData = JSON.parse(userDataCookie);
      initializeMessaging(storedUserData.userName, "subscribe");
    }
  }, []);
  const handleLogout = () => {
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("jwtTokenAdmin");
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const path = `authen/systemAuthentication/logout`;
        const method = "GET";
        const userDataCookie = Cookies.get("userDataAdmin");
        const storedUserData = JSON.parse(userDataCookie);
        await makeRequest(method, path, null, axiosInstance);
        initializeMessaging(storedUserData.userName);
        Cookies.remove("jwtTokenAdmin");
        Cookies.remove("userDataAdmin");
        window.location.href = "/admin/login";
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  return (
    <div id="wrapper">
      <header id="topnav">
        {/* Topbar Start */}
        <div className="navbar-custom">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-right mb-0">
              <li className="d-none d-sm-block">
                <form className="app-search">
                  <div className="app-search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <div className="input-group-append">
                        <button className="btn">
                          <i className="fa fa-user" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
            <div className="logo-box-1">
              <Link to={"/admin"} className="logo-1 text-center logo-light">
                <span className="logo-lg">
                  <img src={images.webLogo1} alt="" height={70} />
                  {/* <span class="logo-lg-text-light">Codefox</span> */}
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* end Topbar */}
        <div className="topbar-menu">
          <div className="container-fluid" style={{ marginLeft: "5px" }}>
            <div id="navigation">
              {/* Navigation Menu*/}
              <ul className="navigation-menu">
                <li className="has-submenu">
                  <Link to={`/admin`}>
                    <i className="fa fa-home " />
                    Home
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to={`/admin/user`}>
                    <i className="fa fa-user-circle-o " />
                    User
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to={`/admin/product`}>
                    <i className="fa fa-shopping-bag" />
                    Product
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to={`/admin/category`}>
                    <i className="fa fa-suitcase" />
                    Category
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to={`/admin/invoice`}>
                    <i className="fa fa-credit-card-alt" />
                    Invoice
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to={`/admin/refund`}>
                    <i className="fa fa-history" />
                    Refund History
                  </Link>
                </li>
                <li className="has-submenu">
                  <a href="https://sso.ghn.dev/v2/ssoLogin?app=import&returnUrl=http://5sao.ghn.dev/sso-login?token=">
                    <i className="fa fa-truck" />
                    GHN Shipping Order
                  </a>
                </li>
                <li className="has-submenu">
                  <button onClick={handleLogout}>
                    <i className="fa fa-sign-out" />
                    Logout
                  </button>
                </li>
              </ul>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
