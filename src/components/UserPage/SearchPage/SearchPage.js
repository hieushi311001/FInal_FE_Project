import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import { addToCart } from "~/services";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("query");
    const APIdata = {
      filter: {
        name: searchQuery,
      },
      pagination: {
        page: 1,
        limit: 5,
      },
    };
    const fetchData = async () => {
      try {
        const seenIds = new Set();
        const path = `unauthen/shop/filterProducts`;
        const method = "POST";
        const result3 = await makeRequest(method, path, APIdata);
        const filteredData = result3.content.filter((item) => {
          const isDuplicate = seenIds.has(item.id);
          seenIds.add(item.id);
          return !isDuplicate;
        });
        const updatedResult3 = {
          ...result3,
          content: filteredData, // Use a colon here instead of an equal sign
        };
        setData(updatedResult3);
      } catch (error) {
        console.error("Error fetching filtered data:", error.message);
      }
    };
    fetchData();
  }, [location.search]);
  const capitalizeString = (inputString) => {
    return inputString.toUpperCase();
  };
  const capitalizeFirstLetter = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
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
  const handleAddToCartForProduct = (productId, color, size, quantity) => {
    console.log(productId, color, size, quantity);
    if (addToCart(productId, color, size, quantity)) {
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="product-list-search">
      <div className="row-search">
        {Object.keys(data).length !== 0 &&
          (data.content.length === 0 ? (
            <p>Your request does not match any products</p>
          ) : (
            data.content.map((item, index) => (
              <div className="col-lg-12 col-sm-6" key={index}>
                <div className="product-item-search">
                  <div className="pi-pic-search">
                    <img
                      src={item.image1}
                      alt=""
                      className="product-image-search"
                    />
                    <div className="sale pp-sale">Sale</div>
                    <div className="icon">
                      <i className="icon_heart_alt" />
                    </div>
                  </div>
                  <div className="pi-content-search">
                    <div className="catagory-name-search">
                      {capitalizeString(item.name)}
                    </div>
                    <a href={{}} className="product-link-search">
                      <h5>{capitalizeFirstLetter(item.brand)}</h5>
                      <div className="clamp-container">
                        <h6>{item.description}</h6>
                      </div>
                    </a>
                    <div className="pd-rating">
                      {/* Assuming you have a component called StarRating */}
                      <StarRating rating={item.overallRating} />
                    </div>
                    <div className="product-price-search">
                      <h4>
                        $14.00
                        <span>$35.00</span>
                      </h4>
                    </div>
                    <div className="buttons-search">
                      <Link
                        to={`/product/${item.productId}`}
                        className="w-icon-search active-search"
                      >
                        Quick View
                      </Link>
                      <button
                        className="quick-view-search"
                        onClick={() =>
                          handleAddToCartForProduct(
                            item.productId,
                            item.color,
                            item.size,
                            1
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
