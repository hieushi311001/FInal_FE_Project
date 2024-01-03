import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductImage from "./ProductImage";
import RelativeProduct from "./RelativeProduct";
import CommentList from "./CommentList";
import { addToCart } from "~/services";
import { useNavigate, Link } from "react-router-dom";
import { showSuccessNotification, showErrorNotification } from "~/services";
function ProductDetailPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(0);
  const params = useParams();
  const [color, setColor] = useState("none");
  const [selectedSize, setSelectedSize] = useState("none");
  const [size, setSize] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [maxNum, setMaxNum] = useState(0);
  const [cate, setCate] = useState("");
  useEffect(() => {
    window.scroll(0, 0);
  }, [params.product_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `unauthen/shop/product_id=${params.product_id}?showFull=false`;
        const path2 = `unauthen/shop/product_id=${params.product_id}?showFull=true`;
        const method = "GET";
        const result = await makeRequest(method, path);
        console.log(result);
        const path1 = `unauthen/shop/productSizeList?productId=${params.product_id}&color=${result.content[0].color}`;
        const result1 = await makeRequest(method, path1);
        const result2 = await makeRequest(method, path2);

        const extractedData = result2.content.map(
          ({ color, size, availableQuantity }) => ({
            color,
            size,
            availableQuantity,
          })
        );
        const nameArray = result.content[0].categories.map((item) => item.name);
        const resultString = nameArray.join(", ");
        setCate(resultString);
        console.log("check: ", extractedData);
        setMaxNum(result.content[0].availableQuantity);
        setFilterData(extractedData);
        console.log(result1);
        setSize(result1);
        setData(result);
        setColor(result.content[0].color);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.product_id]);

  if (Object.keys(data).length !== 0) {
    var resultObject = {};

    let allKeys = Array.from(
      new Set(data.content.flatMap((obj) => Object.keys(obj)))
    );

    data.content.forEach((obj, index) => {
      allKeys.forEach((key) => {
        let value = obj[key];

        if (!resultObject.hasOwnProperty(key)) {
          resultObject[key] = [value];
        } else {
          resultObject[key].push(value);
        }
      });
    });

    var sum = resultObject.availableQuantity.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }
  const increment = () => {
    if (value < maxNum) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

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
  function setSelectedColor({ index, color }) {
    const fetchData = async () => {
      try {
        const method = "GET";
        const path1 = `unauthen/shop/productSizeList?productId=${params.product_id}&color=${color}`;
        const result1 = await makeRequest(method, path1);
        setSize(result1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const productFound = filterData.find(
      (product) => product.color === color && product.size === size
    );
    if (productFound) {
      const quantity = productFound.availableQuantity;
      console.log(quantity);
      setMaxNum(quantity);
    }
    setValue(0);
    setSelectedSize("none");
    fetchData();
    setColor(color);
    setImageUrl(index);
  }
  // console.log("Ảnh active:", imageUrl);
  const handleAddToCartForProduct = () => {
    if (value !== 0) {
      if (addToCart(params.product_id, color, selectedSize, value)) {
      } else {
        navigate("/login");
      }
    } else {
      showErrorNotification("Error!", "Please input the value of quantity");
    }
  };
  return (
    <div>
      .
      <section className="product-shop spad page-details-1">
        <div className="container">
          <div className="row">
            {Object.keys(data).length !== 0 && (
              <div className="col-lg-9">
                <div className="row">
                  <ProductImage
                    image1={resultObject.image1[imageUrl]}
                    image2={resultObject.image2[imageUrl]}
                    image3={resultObject.image3[imageUrl]}
                    image4={resultObject.image4[imageUrl]}
                  />
                  <div className="col-lg-6">
                    <div className="product-details">
                      <div className="pd-title">
                        <span>
                          {resultObject.brand[imageUrl]} | {cate}
                        </span>
                        <h3>{resultObject.name[imageUrl]}</h3>
                        <a href={{}} className="heart-icon">
                          <i className="icon_heart_alt" />
                        </a>
                      </div>

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
                              <input
                                type="radio"
                                id={`cc-${color}`}
                                name="color"
                                onClick={() =>
                                  setSelectedColor({ index, color })
                                }
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
                        {size.content.map((size, index) => {
                          if (
                            (index === 0 || size !== size[index - 1]) &&
                            size !== "none"
                          ) {
                            return (
                              <div key={index} className="sc-item">
                                <input
                                  type="radio"
                                  id={`sm-${size}`}
                                  name="size"
                                  checked={selectedSize === size}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    const productFound = filterData.find(
                                      (product) =>
                                        product.color === color &&
                                        product.size === size
                                    );
                                    if (productFound) {
                                      const quantity =
                                        productFound.availableQuantity;
                                      console.log(quantity);
                                      setMaxNum(quantity);
                                      setValue(0);
                                    }
                                    setSelectedSize(size);
                                  }}
                                />
                                <label
                                  htmlFor={`sm-${size}`}
                                  className={`sm-${size} ${
                                    selectedSize === size ? "active" : ""
                                  }`}
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

                          <input type="text" value={value} readOnly />
                          <span className="inc qtybtn" onClick={increment}>
                            +
                          </span>
                        </div>
                        <button
                          onClick={handleAddToCartForProduct}
                          className="primary-btn pd-cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <ul className="pd-tags" style={{ visibility: "hidden" }}>
                        <li>
                          <span>CATEGORIES</span>: More Accessories, Wallets
                          &amp; Cases
                        </li>
                        <li>
                          <span>TAGS</span>: Clothing, T-shirt, Woman
                        </li>
                      </ul>
                      <div className="pd-share">
                        <div
                          className="p-code"
                          style={{ visibility: "hidden" }}
                        >
                          Sku : 00012
                        </div>
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
                          Customer Reviews
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
                                <td className="p-catagory">Availability</td>
                                <td>
                                  <div className="p-stock">{sum} In Stock</div>
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
