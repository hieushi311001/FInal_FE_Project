import { Link } from "react-router-dom";
// import $ from "jquery";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserImage from "./UserImage";
import images from "~/assets/images";

function Header() {
  const [cookieData, setCookieData] = useState({});
  const [userDataExists, setUserDataExists] = useState(false);
  useEffect(() => {
    // Lấy giá trị từ cookie khi component được mount
    // const userDataCookie = Cookies.get("userData");
    // const storedUserData = JSON.parse(userDataCookie);
    // if (storedUserData) {
    //   setCookieData(storedUserData);
    // }
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      setUserDataExists(true);
      const storedUserData = JSON.parse(userDataCookie);
      setCookieData(storedUserData);
    } else {
      setUserDataExists(false);
    }
  }, []);
  // $(window).on("load", function () {
  //   $(".loader").fadeOut();
  //   $("#preloder").delay(200).fadeOut("slow");
  // });
  return (
    <div>
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}
      <header className="header-section">
        <div className="header-top">
          <div className="container">
            <div className="ht-left">
              <div className="mail-service">
                <i className=" fa fa-envelope"></i>
                hello.colorlib@gmail.com
              </div>
              <div className="phone-service">
                <i className=" fa fa-phone"></i>
                +65 11.188.888
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
                  <a href="./index.html">
                    <img src={images.logo} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="advanced-search">
                  <button type="button" className="category-btn">
                    All Categories
                  </button>
                  <div className="input-group">
                    <input type="text" placeholder="What do you need?" />
                    <button type="button">
                      <i className="ti-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 text-right col-md-3">
                <ul className="nav-right">
                  <li className="heart-icon">
                    <a href={{}}>
                      <i className="icon_heart_alt"></i>
                      <span>1</span>
                    </a>
                  </li>
                  <li className="cart-icon">
                    <a href={{}}>
                      <i className="icon_bag_alt"></i>
                      <span>3</span>
                    </a>
                    <div className="cart-hover">
                      <div className="select-items">
                        <table>
                          <tbody>
                            <tr>
                              <td className="si-pic">
                                <img src={images.selectproduct1} alt="" />
                              </td>
                              <td className="si-text">
                                <div className="product-selected">
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className="si-close">
                                <i className="ti-close"></i>
                              </td>
                            </tr>
                            <tr>
                              <td className="si-pic">
                                <img src={images.selectproduct2} alt="" />
                              </td>
                              <td className="si-text">
                                <div className="product-selected">
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className="si-close">
                                <i className=" ti-close"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="select-total">
                        <span>total:</span>
                        <h5>$120.00</h5>
                      </div>
                      <div className="select-button">
                        <a href={{}} className="primary-btn view-card">
                          VIEW CARD
                        </a>
                        <a href={{}} className="primary-btn checkout-btn">
                          CHECK OUT
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="cart-price">$150.00</li>
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
                <span>All departments</span>
                <ul className="depart-hover">
                  <li className="active">
                    <a href={{}}>Women’s Clothing</a>
                  </li>
                  <li>
                    <a href={{}}>Men’s Clothing</a>
                  </li>
                  <li>
                    <a href={{}}>Underwear</a>
                  </li>
                  <li>
                    <a href={{}}>Kid's Clothing</a>
                  </li>
                  <li>
                    <a href={{}}>Brand Fashion</a>
                  </li>
                  <li>
                    <a href={{}}>Accessories/Shoes</a>
                  </li>
                  <li>
                    <a href={{}}>Luxury Brands</a>
                  </li>
                  <li>
                    <a href={{}}>Brand Outdoor Apparel</a>
                  </li>
                </ul>
              </div>
            </div>
            <nav className="nav-menu mobile-menu">
              <ul>
                <li className="active">
                  <a href="./index.html">Home</a>
                </li>
                <li>
                  <a href="./shop.html">Shop</a>
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
