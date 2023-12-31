import { Link } from "react-router-dom";
// import $ from "jquery";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserImage from "./UserImage";
import images from "~/assets/images";
import { makeRequest } from "~/services";
import SmallCart from "./SmallCart";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import PopupPage from "./PopupPage";
function Header() {
  const [cookieData, setCookieData] = useState({});
  const [userDataExists, setUserDataExists] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [notifiValue, setNotifiValue] = useState(0);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = "unauthen/category/allCategories";
        const method = "GET";
        const result = await makeRequest(method, path, null);
        setCategory(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkCookie = () => {
      if (!Cookies.get("userData")) {
        const fetchData = async () => {
          try {
            const path = "authen/systemAuthentication/logout";
            const method = "GET";
            const result = await makeRequest(method, path, axiosInstance);
            console.log(result);
          } catch (error) {
            console.error("Error fetching data:", error.message);
          }
        };

        fetchData();
        setUserDataExists(false);
        window.location.href = "/login";
      }
    };
    if (Cookies.get("userData")) {
      setUserDataExists(true);
      const storedUserData = JSON.parse(Cookies.get("userData"));
      setCookieData(storedUserData);
      const intervalId = setInterval(checkCookie, 1000);
      // Cleanup khi component bị unmounted
      return () => clearInterval(intervalId);
    } else {
      setUserDataExists(false);
    }
  }, [userDataExists, navigate]);
  // $(window).on("load", function () {
  //   $(".loader").fadeOut();
  //   $("#preloder").delay(200).fadeOut("slow");
  // });
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const flag = searchValue;
    setSearchValue("");
    localStorage.setItem("search", "flag");
    navigate(`/search?query=${flag}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };
  const updateCartValue = (newValue) => {
    setCartValue(newValue);
  };
  const updateNotifiValue = (newValue) => {
    setNotifiValue(newValue);
  };
  const [selectedProduct, setSelectedProduct] = useState(false);
  const openModal = () => {
    setSelectedProduct(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div>
      {selectedProduct && (
        <PopupPage
          isOpen={!!selectedProduct}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}
      <header className="header-section">
        <div className="header-top">
          <div className="container">
            <div className="ht-left">
              <div className="mail-service">
                <i className=" fa fa-envelope"></i>
                foolishfashionstoreofficial@gmail.com
              </div>
              <div className="phone-service">
                <i className=" fa fa-phone"></i>
                +84 977.815.809
              </div>
            </div>
            <div className="ht-right">
              {/* <Link to={`/login`} className="login-panel">
                <i className="fa fa-user"></i>Login
              </Link> */}
              {userDataExists ? (
                <div className="login-panel-1">
                  <UserImage
                    accountId={cookieData.accountId}
                    avatar={cookieData.avatar}
                    name={cookieData.name}
                  />
                </div>
              ) : (
                <Link to={`/login`} className="login-panel">
                  <i className="fa fa-user"></i>Login
                </Link>
              )}
              <>
                {/* Hello world */}
                <div
                  className="lan-selector"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0px 5px",
                    paddingTop: "15px",
                  }}
                  onClick={() => openModal()}
                >
                  <div style={{ margin: "0px 5px" }}>
                    <div className="fa fa-globe"></div>
                  </div>
                  <div
                    style={{
                      fontFamily: "Muli, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Translation Tool
                  </div>
                </div>
              </>
              <div className="top-social">
                <a href={{}}>
                  <i className="ti-facebook"></i>
                </a>
                <a href={{}}>
                  <i className="ti-twitter-alt"></i>
                </a>
                <a href={{}}>
                  <i className="ti-linkedin"></i>
                </a>
                <a href={{}}>
                  <i className="ti-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <div className="logo">
                  <Link to={`/`}>
                    <img
                      src={images.webLogo}
                      style={{ width: "75%", height: "75%" }}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-7 col-md-7" style={{ paddingTop: "45px" }}>
                <div className="advanced-search">
                  <button type="button" className="category-btn">
                    All Categories
                  </button>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="What do you need?"
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    <button type="button" onClick={handleSearchClick}>
                      <i className="ti-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 text-right col-md-3"
                style={{ paddingTop: "45px" }}
              >
                <ul className="nav-right">
                  <li className="cart-icon">
                    <Link to={`/invoice`}>
                      <i className="fa fa-bell-o"></i>
                      <span>{notifiValue}</span>
                    </Link>
                    <Notification updateNotifiValue={updateNotifiValue} />
                  </li>

                  <li className="cart-icon">
                    <Link to={`/cart`}>
                      <i className="icon_bag_alt"></i>
                      <span>{cartValue}</span>
                    </Link>
                    <SmallCart updateCartValue={updateCartValue} />
                  </li>
                  <li className="heart-icon">
                    <Link to={`/invoice`}>
                      <i className="icon_documents_alt"></i>
                    </Link>
                  </li>
                  <li className="cart-price" style={{ visibility: "hidden" }}>
                    $150.00
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item">
          <div className="container">
            <div className="nav-depart">
              <div className="depart-btn">
                <i className="ti-menu"></i>
                <span>All Categories</span>
                <ul className="depart-hover">
                  {Object.keys(category).length !== 0 && (
                    <ul>
                      {category.map((categoryItem, index) => (
                        <li key={index}>
                          <a href={{}}>{categoryItem.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
            <nav className="nav-menu mobile-menu">
              <ul>
                <li className="active">
                  <Link to={`/`}>Home</Link>
                </li>
                <li>
                  <Link to={`/shop`}>Shop</Link>
                </li>
                <li>
                  <a href={{}}>Collection</a>
                  <ul className="dropdown">
                    <li>
                      <a href={{}}>Men's</a>
                    </li>
                    <li>
                      <a href={{}}>Women's</a>
                    </li>
                    <li>
                      <a href={{}}>Kid's</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="./blog.html">Blog</a>
                </li>
                <li>
                  <a href="./contact.html">Contact</a>
                </li>
                <li>
                  <a href={{}}>Pages</a>
                  <ul className="dropdown">
                    <li>
                      <a href="./blog-details.html">Blog Details</a>
                    </li>
                    <li>
                      <a href="./shopping-cart.html">Shopping Cart</a>
                    </li>
                    <li>
                      <a href="./check-out.html">Checkout</a>
                    </li>
                    <li>
                      <a href="./faq.html">Faq</a>
                    </li>
                    <li>
                      <a href="./register.html">Register</a>
                    </li>
                    <li>
                      <a href="./login.html">Login</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div id="mobile-menu-wrap"></div>
          </div>
        </div>
      </header>
      <section className="hero-section">
        <div className="hero-items owl-carousel">
          <div className="single-hero-items set-bg" data-setbg="img/hero-1.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <span>Bag,kids</span>
                  <h1>Black friday</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <a href={{}} className="primary-btn">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="off-card">
                <h2>
                  Sale <span>50%</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="single-hero-items set-bg" data-setbg="img/hero-2.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <span>Bag,kids</span>
                  <h1>Black friday</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <a href={{}} className="primary-btn">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="off-card">
                <h2>
                  Sale <span>50%</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
