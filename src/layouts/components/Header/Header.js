import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React from "react";
// import $ from 'jquery';
import images from "~/assets/images";
const cx = classNames.bind(styles);

function Header() {
  // $(window).on('load', function () {
  //     $('.loader').fadeOut();
  //     $('#preloder').delay(200).fadeOut('slow');
  // });
  return (
    <div>
      {/* <div id="preloder">
        <div className={cx("loader")}></div>
      </div> */}
      <header className={cx("header-section")}>
        <div className={cx("header-top")}>
          <div className={cx("container")}>
            <div className={cx("ht-left")}>
              <div className={cx("mail-service")}>
                <i className={cx(" fa fa-envelope")}></i>
                hello.colorlib@gmail.com
              </div>
              <div className={cx("phone-service")}>
                <i className={cx(" fa fa-phone")}></i>
                +65 11.188.888
              </div>
            </div>
            <div className={cx("ht-right")}>
              <a href={{}} className={cx("login-panel")}>
                <i className={cx("fa fa-user")}></i>Login
              </a>
              <div className={cx("top-social")}>
                <a href={{}}>
                  <i className={cx("ti-facebook")}></i>
                </a>
                <a href={{}}>
                  <i className={cx("ti-twitter-alt")}></i>
                </a>
                <a href={{}}>
                  <i className={cx("ti-linkedin")}></i>
                </a>
                <a href={{}}>
                  <i className={cx("ti-pinterest")}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("container")}>
          <div className={cx("inner-header")}>
            <div className={cx("row")}>
              <div className={cx("col-lg-2 col-md-2")}>
                <div className={cx("logo")}>
                  <a href="./index.html">
                    <img src={images.logo} alt="" />
                  </a>
                </div>
              </div>
              <div className={cx("col-lg-7 col-md-7")}>
                <div className={cx("advanced-search")}>
                  <button type="button" className={cx("category-btn")}>
                    All Categories
                  </button>
                  <div className={cx("input-group")}>
                    <input type="text" placeholder="What do you need?" />
                    <button type="button">
                      <i className={cx("ti-search")}></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx("col-lg-3 text-right col-md-3")}>
                <ul className={cx("nav-right")}>
                  <li className={cx("heart-icon")}>
                    <a href={{}}>
                      <i className={cx("icon_heart_alt")}></i>
                      <span>1</span>
                    </a>
                  </li>
                  <li className={cx("cart-icon")}>
                    <a href={{}}>
                      <i className={cx("icon_bag_alt")}></i>
                      <span>3</span>
                    </a>
                    <div className={cx("cart-hover")}>
                      <div className={cx("select-items")}>
                        <table>
                          <tbody>
                            <tr>
                              <td className={cx("si-pic")}>
                                <img src={images.selectproduct1} alt="" />
                              </td>
                              <td className={cx("si-text")}>
                                <div className={cx("product-selected")}>
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className={cx("si-close")}>
                                <i className={cx("ti-close")}></i>
                              </td>
                            </tr>
                            <tr>
                              <td className={cx("si-pic")}>
                                <img src={images.selectproduct2} alt="" />
                              </td>
                              <td className={cx("si-text")}>
                                <div className={cx("product-selected")}>
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className={cx("si-close")}>
                                <i className={cx(" ti-close")}></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className={cx("select-total")}>
                        <span>total:</span>
                        <h5>$120.00</h5>
                      </div>
                      <div className={cx("select-button")}>
                        <a href={{}} className={cx("primary-btn view-card")}>
                          VIEW CARD
                        </a>
                        <a href={{}} className={cx("primary-btn checkout-btn")}>
                          CHECK OUT
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className={cx("cart-price")}>$150.00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("nav-item")}>
          <div className={cx("container")}>
            <div className={cx("nav-depart")}>
              <div className={cx("depart-btn")}>
                <i className={cx("ti-menu")}></i>
                <span>All departments</span>
                <ul className={cx("depart-hover")}>
                  <li className={cx("active")}>
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
            <nav className={cx("nav-menu", "mobile-menu")}>
              <ul>
                <li className={cx("active")}>
                  <a href="./index.html">Home</a>
                </li>
                <li>
                  <a href="./shop.html">Shop</a>
                </li>
                <li>
                  <a href={{}}>Collection</a>
                  <ul className={cx("dropdown")}>
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
                  <ul className={cx("dropdown")}>
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
      <section className={cx("hero-section")}>
        <div className={cx("hero-items", "owl-carousel")}>
          <div
            className={cx("single-hero-items", "set-bg")}
            data-setbg="img/hero-1.jpg"
          >
            <div className={cx("container")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-5")}>
                  <span>Bag,kids</span>
                  <h1>Black friday</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <a href={{}} className={cx("primary-btn")}>
                    Shop Now
                  </a>
                </div>
              </div>
              <div className={cx("off-card")}>
                <h2>
                  Sale <span>50%</span>
                </h2>
              </div>
            </div>
          </div>
          <div
            className={cx("single-hero-items", "set-bg")}
            data-setbg="img/hero-2.jpg"
          >
            <div className={cx("container")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-5")}>
                  <span>Bag,kids</span>
                  <h1>Black friday</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <a href={{}} className={cx("primary-btn")}>
                    Shop Now
                  </a>
                </div>
              </div>
              <div className={cx("off-card")}>
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
