import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./SideBar.css";
import axios from "axios";
import ListProduct from "../ListProduct";
import ShopPage from "..";
function SideBar() {
  const [range, setRange] = useState([500, 5000]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const APIdata = {
      page: 1,
      limit: 50,
    };

    const fetchData = async () => {
      try {
        const path = `unauthen/shop/allProducts`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata);
        const response = await axios.get("unauthen/category/allCategories");

        const rebrands = result.content.reduce((uniqueNames, product) => {
          if (!uniqueNames.includes(product.brand)) {
            uniqueNames.push(product.brand);
          }
          return uniqueNames;
        }, []);

        const brands = rebrands.map((brand) => {
          // Kiểm tra nếu giá trị brand là "dolce&gabbana", thì thay thế thành "Dolce&Gabbana"
          if (brand.toLowerCase() === "dolce&gabbana") {
            return "Dolce&Gabbana";
          }
          const capitalizedBrand =
            brand.charAt(0).toUpperCase() + brand.slice(1);
          return capitalizedBrand;
        });

        const prices = result.content.reduce((uniqueNames, product) => {
          if (!uniqueNames.includes(product.sellingPrice)) {
            uniqueNames.push(product.sellingPrice);
          }
          return uniqueNames;
        }, []);
        const recolors = result.content.reduce((uniqueNames, product) => {
          if (!uniqueNames.includes(product.color)) {
            uniqueNames.push(product.color);
          }
          return uniqueNames;
        }, []);
        const colors = recolors
          .filter((color) => color.toLowerCase() !== "none")
          .map((color) => {
            // Chuyển đổi chữ cái đầu thành chữ hoa cho các giá trị khác "none"
            const capitalizedColor =
              color.charAt(0).toUpperCase() + color.slice(1);
            return capitalizedColor;
          });
        setCategory(response.data.content);
        setData({ brands, prices, colors });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleFilterClick = async () => {
    try {
      const APIdata = {
        page: 1,
        limit: 4,
      };
      // Gọi API ở đây
      const path = `unauthen/shop/allProducts`;
      const method = "POST";
      const result3 = await makeRequest(method, path, APIdata);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };
  const handleSliderChange = (newRange) => {
    setRange(newRange);
  };
  const formatCurrency = (value) => `$${value}`;

  return (
    <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
      <div className="filter-widget">
        <h4 className="fw-title">Categories</h4>
        <ul className="filter-catagories">
          {Object.keys(category).length !== 0 &&
            category.map((category, index) => (
              <li>
                <a href={{}}>{category.name}</a>
              </li>
            ))}
        </ul>
      </div>
      <div className="filter-widget">
        <h4 className="fw-title">Brand</h4>
        <div className="fw-brand-check">
          {/* {console.log(data)} */}
          {Object.keys(data).length !== 0 &&
            data.brands.map((brand, index) => (
              <div key={index} className="bc-item">
                <label htmlFor={`bc-${brand}`}>
                  {brand}
                  <input type="checkbox" id={`bc-${brand}`} />
                  <span className="checkmark" />
                </label>
              </div>
            ))}
        </div>
      </div>
      {/* <div className="filter-widget">
        <h4 className="fw-title">Price</h4>
        <div className="filter-range-wrap">
          <div className="range-slider">
            <div className="price-input">
              <input type="text" id="minamount" />
              <input type="text" id="maxamount" />
            </div>
          </div>
          <div
            className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
            data-min={33}
            data-max={98}
          >
            <div className="ui-slider-range ui-corner-all ui-widget-header" />
            <span
              tabIndex={0}
              className="ui-slider-handle ui-corner-all ui-state-default"
            />
            <span
              tabIndex={0}
              className="ui-slider-handle ui-corner-all ui-state-default"
            />
          </div>
        </div>
        <a href={{}} className="filter-btn">
          Filter
        </a>
      </div> */}
      <div className="filter-widget">
        <h4 className="fw-title">Price</h4>
        <div className="filter-range-wrap">
          <div className="range-slider">
            <div className="price-input">
              <input
                type="text"
                id="minamount"
                value={formatCurrency(range[0])}
                readOnly
              />
              <input
                type="text"
                id="maxamount"
                value={formatCurrency(range[1])}
                readOnly
              />
            </div>
          </div>
          <Slider
            className="custom-slider"
            range
            min={500}
            max={5000} // Adjust according to your needs
            value={range}
            onChange={handleSliderChange}
          />
        </div>
        <button
          className="filter-btn"
          style={{
            fontSize: "14px",
            color: "#ffffff",
            fontWeight: 700,
            background: "#e7ab3c",
            padding: "7px 20px 5px",
            borderRadius: "2px",
            display: "inline-block",
            textTransform: "uppercase",
            border: "none", // Remove the border to make it visually consistent
            cursor: "pointer", // Add a pointer cursor for better user feedback
          }}
          onClick={handleFilterClick}
        >
          Filter
        </button>
      </div>
      <div className="filter-widget">
        <h4 className="fw-title">Color</h4>
        <div className="fw-color-choose">
          {Object.keys(data).length !== 0 &&
            data.colors.map((color, index) => (
              <div className="cs-item" key={index}>
                <input type="radio" id={`cs-${color}`} name="color" />
                <span className="checkmark" />
                <label className={`cs-${color}`} htmlFor={`cs-${color}`}>
                  {color}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
