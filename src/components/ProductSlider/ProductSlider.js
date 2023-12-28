import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ProductSlider = ({
  productid,
  image,
  brand,
  name,
  price,
  discount,
  color,
  size,
  quantity,
  onAddToCart,
}) => {
  const moneyDiscount = discount / 100;
  const newPrice = price - moneyDiscount * price;
  const handleAddToCart = (productId, color, size, quantity) => {
    onAddToCart(productId, color, size, quantity);
  };

  return (
    <div className="product-item">
      <div className="pi-pic-1">
        <img src={image} alt="" style={{ width: "284px", height: "284px" }} />
        {discount !== 0 && <div className="sale">{discount}%</div>}
        <div className="icon">
          <i className="icon_heart_alt" />
        </div>
        <ul>
          <li className="w-icon active">
            <button
              onClick={() => handleAddToCart(productid, color, size, quantity)}
            >
              <i className="icon_bag_alt" />
            </button>
          </li>
          <li className="quick-view">
            <Link to={`/product/${productid}`}>+ Quick View</Link>
          </li>
        </ul>
      </div>
      <div className="pi-text">
        <div className="catagory-name">{brand}</div>
        <a href={{}}>
          <h5>{name}</h5>
        </a>
        {discount !== 0.0 ? (
          <div className="product-price">
            {newPrice}$ <span>{price}$</span>
          </div>
        ) : (
          <div className="product-price-1">
            <span>{price}$</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
