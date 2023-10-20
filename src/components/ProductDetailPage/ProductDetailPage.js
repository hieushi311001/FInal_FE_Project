import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductImage from "./ProductImage";
function ProductDetailPage() {
  const [value, setValue] = useState(1);
  const [data, setData] = useState([]);
  const params = useParams();

  console.log(params.product_id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `unauthen/shop/product_id=${params.product_id}`;
        const method = "GET";
        const result = await makeRequest(method, path);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.product_id]);

  console.log(data.content);
  if (Object.keys(data).length !== 0) {
    // Tạo một đối tượng mới để chứa kết quả
    var resultObject = {};

    // Lấy tất cả các key duy nhất từ tất cả các đối tượng
    let allKeys = Array.from(
      new Set(data.content.flatMap((obj) => Object.keys(obj)))
    );

    // So sánh key-value của tất cả thuộc tính giữa các đối tượng
    data.content.forEach((obj, index) => {
      allKeys.forEach((key) => {
        let value = obj[key];

        // Kiểm tra xem key đã tồn tại trong đối tượng kết quả chưa
        if (!resultObject.hasOwnProperty(key)) {
          // Nếu chưa tồn tại, thêm key-value vào đối tượng kết quả
          resultObject[key] = [value];
        } else {
          // Nếu đã tồn tại, thêm giá trị vào mảng tương ứng với key
          resultObject[key].push(value);
        }
      });
    });

    var sum = resultObject.availableQuantity.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log("test1", sum);
    console.log("test", resultObject.color[1]);
  }
  const increment = () => {
    if (value < sum) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  console.log("test1", typeof sum);
  const StarRating = ({ rating }) => {
    const maxStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = maxStars - filledStars;

    const renderStars = (count, isFilled) => {
      const stars = [];
      const starClass = isFilled ? "fa fa-star" : "fa fa-star-o";

      for (let i = 0; i < count; i++) {
        stars.push(<i key={i} className={starClass} />);
      }

      return stars;
    };

    return (
      <div className="star-rating">
        {renderStars(filledStars, true)}
        {renderStars(emptyStars, false)}
        <span>({rating})</span>
      </div>
    );
  };
  return (
    <div>
      <section className="product-shop spad page-details">
        <div className="container">
          <div className="row">
            {Object.keys(data).length !== 0 &&
              data.content.map((product) => (
                <div className="col-lg-9" key={product.id}>
                  <div className="row">
                    <ProductImage
                      image1={product.image1}
                      image2={product.image2}
                      image3={product.image3}
                      image4={product.image4}
                    />
                    <div className="col-lg-6">
                      <div className="product-details">
                        <div className="pd-title">
                          <span>{product.brand}</span>
                          <h3>{product.name}</h3>
                          <a href={{}} className="heart-icon">
                            <i className="icon_heart_alt" />
                          </a>
                        </div>
                        {console.log(typeof product.color)}
                        <div className="pd-rating">
                          <StarRating rating={product.overallRating} />
                        </div>
                        <div className="pd-desc">
                          <p>{product.description}</p>
                          {product.discount === 0.0 ? (
                            <h4>
                              {product.sellingPrice}$ <span></span>
                            </h4>
                          ) : (
                            <h4>
                              {product.sellingPrice -
                                (product.discount / 100) * product.sellingPrice}
                              $ <span>{product.sellingPrice}$</span>
                            </h4>
                          )}
                          {/* <h4>
                            $495.00 <span>629.99</span>
                          </h4> */}
                        </div>
                        <div className="pd-color">
                          <h6>Color</h6>
                          <div className="pd-color-choose">
                            {/* <div className="cc-item">
                              <input type="radio" id="cc-black" />
                              <label htmlFor="cc-black" className={{}} />
                            </div> */}
                            {resultObject.color.map((color, index) => (
                              <div key={index} className="cc-item">
                                {console.log(color)}
                                <input
                                  type="radio"
                                  id={`cc-${color}`}
                                  name="color"
                                />
                                <label
                                  htmlFor={`cc-${color}`}
                                  className={`cc-${color}`}
                                ></label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pd-size-choose">
                          {/* <div className="sc-item">
                            <input type="radio" id="sm-size" />
                            <label htmlFor="sm-size">s</label>
                          </div> */}
                          {resultObject.size.map((size, index) =>
                            size === "none" ? null : (
                              <div key={index} className="sc-item">
                                <input
                                  type="radio"
                                  id={`sm-${size}`}
                                  name="size"
                                />
                                <label
                                  htmlFor={`sm-${size}`}
                                  className={`sm-${size}`}
                                ></label>
                              </div>
                            )
                          )}
                        </div>
                        <div className="quantity">
                          <div className="pro-qty">
                            <span className="dec qtybtn" onClick={decrement}>
                              -
                            </span>
                            {console.log(sum)}
                            <input
                              type="text"
                              value={value}
                              max={10}
                              readOnly
                            />
                            <span className="inc qtybtn" onClick={increment}>
                              +
                            </span>
                          </div>
                          <a href={{}} className="primary-btn pd-cart">
                            Add To Cart
                          </a>
                        </div>
                        <ul className="pd-tags">
                          <li>
                            <span>CATEGORIES</span>: More Accessories, Wallets
                            &amp; Cases
                          </li>
                          <li>
                            <span>TAGS</span>: Clothing, T-shirt, Woman
                          </li>
                        </ul>
                        <div className="pd-share">
                          <div className="p-code">Sku : 00012</div>
                          <div className="pd-social">
                            <a href={{}}>
                              <i className="ti-facebook" />
                            </a>
                            <a href={{}}>
                              <i className="ti-twitter-alt" />
                            </a>
                            <a href={{}}>
                              <i className="ti-linkedin" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="product-tab">
                    <div className="tab-item">
                      <ul className="nav" role="tablist">
                        <li>
                          <a
                            className="active"
                            data-toggle="tab"
                            href="#tab-1"
                            role="tab"
                          >
                            DESCRIPTION
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-2" role="tab">
                            SPECIFICATIONS
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-3" role="tab">
                            Customer Reviews (02)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-item-content">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade-in active"
                          id="tab-1"
                          role="tabpanel"
                        >
                          <div className="product-content">
                            <div className="row">
                              <div className="col-lg-7">
                                <h5>Introduction</h5>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in{" "}
                                </p>
                                <h5>Features</h5>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in{" "}
                                </p>
                              </div>
                              <div className="col-lg-5">
                                <img
                                  src="img/product-single/tab-desc.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-2"
                          role="tabpanel"
                        >
                          <div className="specification-table">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="p-catagory">
                                    Customer Rating
                                  </td>
                                  <td>
                                    <div className="pd-rating">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <span>(5)</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Price</td>
                                  <td>
                                    <div className="p-price">$495.00</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Add To Cart</td>
                                  <td>
                                    <div className="cart-add">
                                      + add to cart
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Availability</td>
                                  <td>
                                    <div className="p-stock">22 in stock</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Weight</td>
                                  <td>
                                    <div className="p-weight">1,3kg</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Size</td>
                                  <td>
                                    <div className="p-size">Xxl</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Color</td>
                                  <td>
                                    <span className="cs-color" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Sku</td>
                                  <td>
                                    <div className="p-code">00012</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-3"
                          role="tabpanel"
                        >
                          <div className="customer-review-option">
                            <h4>2 Comments</h4>
                            <div className="comment-option">
                              <div className="co-item">
                                <div className="avatar-pic">
                                  <img
                                    src="img/product-single/avatar-1.png"
                                    alt=""
                                  />
                                </div>
                                <div className="avatar-text">
                                  <div className="at-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o" />
                                  </div>
                                  <h5>
                                    Brandon Kelley <span>27 Aug 2019</span>
                                  </h5>
                                  <div className="at-reply">Nice !</div>
                                </div>
                              </div>
                              <div className="co-item">
                                <div className="avatar-pic">
                                  <img
                                    src="img/product-single/avatar-2.png"
                                    alt=""
                                  />
                                </div>
                                <div className="avatar-text">
                                  <div className="at-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o" />
                                  </div>
                                  <h5>
                                    Roy Banks <span>27 Aug 2019</span>
                                  </h5>
                                  <div className="at-reply">Nice !</div>
                                </div>
                              </div>
                            </div>
                            <div className="personal-rating">
                              <h6>Your Ratind</h6>
                              <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                            <div className="leave-comment">
                              <h4>Leave A Comment</h4>
                              <form action="#" className="comment-form">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <input type="text" placeholder="Name" />
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" placeholder="Email" />
                                  </div>
                                  <div className="col-lg-12">
                                    <textarea
                                      placeholder="Messages"
                                      defaultValue={""}
                                    />
                                    <button type="submit" className="site-btn">
                                      Send message
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;
