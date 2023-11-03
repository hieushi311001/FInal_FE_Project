import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductImage from "./ProductImage";
import RelativeProduct from "./RelativeProduct";
import CommentList from "./CommentList";
function ProductDetailPage() {
  const [value, setValue] = useState(1);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(0);
  const params = useParams();

  // console.log(params.product_id);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    // }, [params.product_id]);
  }, []);

  // console.log(data.content);
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
    // const uniqueValues = {};
    // for (const key in resultObject) {
    //   if (resultObject.hasOwnProperty(key)) {
    //     const array = resultObject[key];
    //     const uniqueArray = [];

    //     // Duyệt qua từng giá trị trong mảng và lưu giá trị duy nhất
    //     for (const value of array) {
    //       if (!uniqueValues.hasOwnProperty(value)) {
    //         uniqueArray.push(value);
    //         uniqueValues[value] = true;
    //       }
    //     }

    //     // Gán mảng mới (chứa giá trị duy nhất) lại vào đối tượng
    //     resultObject[key] = uniqueArray;
    //   }
    // }

    var sum = resultObject.availableQuantity.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    // console.log("test1", resultObject);
    // console.log("test", resultObject.size);
  }
  const increment = () => {
    if (value < resultObject.availableQuantity[imageUrl]) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  // console.log("test1", typeof sum);
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
  function setSelectedColor({ index }) {
    // console.log("key nè: ", index);
    setImageUrl(index);
  }
  // console.log("Ảnh active:", imageUrl);
  return (
    <div>
      <section className="product-shop spad page-details-1">
        <div className="container">
          <div className="row">
            {Object.keys(data).length !== 0 && (
              <div className="col-lg-9">
                <div className="row">
                  {/* {console.log("ảnh set nè: ", resultObject.image1[imageUrl])} */}
                  <ProductImage
                    image1={resultObject.image1[imageUrl]}
                    image2={resultObject.image2[imageUrl]}
                    image3={resultObject.image3[imageUrl]}
                    image4={resultObject.image4[imageUrl]}
                  />
                  <div className="col-lg-6">
                    <div className="product-details">
                      <div className="pd-title">
                        <span>{resultObject.brand[imageUrl]}</span>
                        <h3>{resultObject.name[imageUrl]}</h3>
                        <a href={{}} className="heart-icon">
                          <i className="icon_heart_alt" />
                        </a>
                      </div>
                      {/* {console.log(typeof product.color)} */}
                      <div className="pd-rating">
                        <StarRating
                          rating={resultObject.overallRating[imageUrl]}
                        />
                      </div>
                      <div className="pd-desc">
                        <p>{resultObject.description[imageUrl]}</p>
                        {resultObject.discount[imageUrl] === 0.0 ? (
                          <h4>
                            {resultObject.sellingPrice[imageUrl]}$ <span></span>
                          </h4>
                        ) : (
                          <h4>
                            {resultObject.sellingPrice[imageUrl] -
                              (resultObject.discount[imageUrl] / 100) *
                                resultObject.sellingPrice[imageUrl]}
                            ${" "}
                            <span>{resultObject.sellingPrice[imageUrl]}$</span>
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
                              {/* {console.log("color nè: ", color)} */}
                              <input
                                type="radio"
                                id={`cc-${color}`}
                                name="color"
                                onClick={() => setSelectedColor({ index })}
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
                        {resultObject.size.map((size, index) => {
                          if (
                            (index === 0 ||
                              size !== resultObject.size[index - 1]) &&
                            size !== "none"
                          ) {
                            return (
                              <div key={index} className="sc-item">
                                <input
                                  type="radio"
                                  id={`sm-${size}`}
                                  name="size"
                                />
                                <label
                                  htmlFor={`sm-${size}`}
                                  className={`sm-${size}`}
                                >
                                  {size}
                                </label>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div className="quantity">
                        <div className="pro-qty">
                          <span className="dec qtybtn" onClick={decrement}>
                            -
                          </span>
                          {/* {console.log(sum)} */}
                          <input type="text" value={value} readOnly />
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
                <div className="product-tab">
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
                          <div className="col-lg-12">
                            <h5>Introduction</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat. Duis aute
                              irure dolor in{" "}
                            </p>
                            <h5>Features</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat. Duis aute
                              irure dolor in{" "}
                            </p>
                          </div>
                          <div className="col-lg-5">
                            <img src="img/product-single/tab-desc.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="tab-2" role="tabpanel">
                        <div className="specification-table">
                          <table>
                            <tbody>
                              <tr>
                                <td className="p-catagory">Customer Rating</td>
                                <td>
                                  <div className="pd-rating">
                                    <StarRating
                                      rating={
                                        resultObject.overallRating[imageUrl]
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-catagory">Price</td>
                                <td>
                                  <div className="p-price">
                                    {resultObject.discount[imageUrl] === 0.0
                                      ? `${resultObject.sellingPrice[imageUrl]}$`
                                      : `${
                                          resultObject.sellingPrice[imageUrl] -
                                          (resultObject.discount[imageUrl] /
                                            100) *
                                            resultObject.sellingPrice[imageUrl]
                                        }$`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-catagory">Add To Cart</td>
                                <td>
                                  <div className="cart-add">+ add to cart</div>
                                </td>
                              </tr>
                              <tr>
                                <td className="p-catagory">Availability</td>
                                <td>
                                  <div className="p-stock">{sum} In Stock</div>
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
                                {resultObject.size.map((size, index) => {
                                  if (
                                    (index === 0 ||
                                      size !== resultObject.size[index - 1]) &&
                                    size !== "none"
                                  ) {
                                    return (
                                      <td key={index}>
                                        <div className="p-size">{size}</div>
                                      </td>
                                    );
                                  }
                                  return null;
                                })}
                              </tr>
                              <tr>
                                <td className="p-catagory">Color</td>
                                <td>
                                  {resultObject.color.map((color, index) => (
                                    <span className={`cs-${color}`}></span>
                                  ))}
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
                      <CommentList
                        productId={resultObject.productId[imageUrl]}
                        color={resultObject.color[imageUrl]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* {console.log("tesssst 1:", resultObject.productId[imageUrl])} */}
      {Object.keys(data).length !== 0 && (
        <RelativeProduct
          productId={resultObject.productId[imageUrl]}
          color={resultObject.color[imageUrl]}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
