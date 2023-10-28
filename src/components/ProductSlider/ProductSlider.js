import React from "react";
import { Link } from "react-router-dom";
const ProductSlider = ({
  key,
  productid,
  image,
  brand,
  name,
  price,
  discount,
}) => {
  const moneyDiscount = discount / 100;
  const newPrice = price - moneyDiscount * price;
  return (
    <div className="product-item">
      <div className="pi-pic-1">
        <img src={image} alt="" />
        {discount !== 0 && <div className="sale">{discount}%</div>}
        <div className="icon">
          <i className="icon_heart_alt" />
        </div>
        <ul>
          <li className="w-icon active">
            <a href={{}}>
              <i className="icon_bag_alt" />
            </a>
          </li>
          <li className="quick-view">
            <Link to={`/${productid}`}>+ Quick View</Link>
            {/* <a href={{}}>+ Quick View</a> */}
          </li>
          <li className="w-icon">
            <a href={{}}>
              <i className="fa fa-random" />
            </a>
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
        {/* <div className="product-price">
          {discount}
          <span>{price}$</span>
        </div> */}
      </div>
    </div>
  );
};

export default ProductSlider;
