import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./ShopPage.css";
import ListProduct from "./ListProduct";
import axios from "axios";
import Slider from "rc-slider";
function ShopPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([500, 5000]);
  const [sideBarData, setSideBarData] = useState([]);
  const [category, setCategory] = useState([]);
  const options1 = [
    { value: 1, label: "Default Sorting" },
    { value: 2, label: "Sorting A-Z" },
    { value: 3, label: "Sorting Z-A" },
  ];

  // Define your options for the second dropdown
  const options2 = [
    { value: 6, label: "Show: 06" },
    { value: 12, label: "Show: 12" },
    { value: 15, label: "Show: 15" },
  ];
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  useEffect(() => {
    const shopAPIdata = {
      page: page,
      limit: selectedOption2.value,
    };
    const sidebarAPIdata = {
      page: 1,
      limit: 50,
    };

    const fetchData = async () => {
      try {
        const path = `unauthen/shop/allProducts`;
        const method = "POST";

        const shopResult = await makeRequest(method, path, shopAPIdata);
        const sidebarResult = await makeRequest(method, path, sidebarAPIdata);
        const response = await axios.get("unauthen/category/allCategories");

        const rebrands = sidebarResult.content.reduce(
          (uniqueNames, product) => {
            if (!uniqueNames.includes(product.brand)) {
              uniqueNames.push(product.brand);
            }
            return uniqueNames;
          },
          []
        );

        const brands = rebrands.map((brand) => {
          // Kiểm tra nếu giá trị brand là "dolce&gabbana", thì thay thế thành "Dolce&Gabbana"
          if (brand.toLowerCase() === "dolce&gabbana") {
            return "Dolce&Gabbana";
          }
          const capitalizedBrand =
            brand.charAt(0).toUpperCase() + brand.slice(1);
          return capitalizedBrand;
        });

        const prices = sidebarResult.content.reduce((uniqueNames, product) => {
          if (!uniqueNames.includes(product.sellingPrice)) {
            uniqueNames.push(product.sellingPrice);
          }
          return uniqueNames;
        }, []);
        const recolors = sidebarResult.content.reduce(
          (uniqueNames, product) => {
            if (!uniqueNames.includes(product.color)) {
              uniqueNames.push(product.color);
            }
            return uniqueNames;
          },
          []
        );
        const colors = recolors
          .filter((color) => color.toLowerCase() !== "none")
          .map((color) => {
            // Chuyển đổi chữ cái đầu thành chữ hoa cho các giá trị khác "none"
            const capitalizedColor =
              color.charAt(0).toUpperCase() + color.slice(1);
            return capitalizedColor;
          });
        setCategory(response.data.content);
        setSideBarData({ brands, prices, colors });
        setData(shopResult);
        console.log(shopResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // }, [params.product_id]);
  }, [selectedOption2.value, page]);

  // State and handlers for the first dropdown

  const handleOptionChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
    if (typeof data === "object" && data.hasOwnProperty("content")) {
      const { content } = data;

      // Ensure content is an array
      if (Array.isArray(content)) {
        const sortedContent = [...content];

        switch (selectedOption.value) {
          case 2:
            // Sorting A-Z by name
            sortedContent.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 3:
            // Sorting Z-A by name
            sortedContent.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Default Sorting or any other logic
            // You can set your default sorting logic here
            break;
        }

        // Update the content state
        setData({ ...data, content: sortedContent });
      }
    }
  };

  // State and handlers for the second dropdown

  const handleOptionChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setSelectedOption1(options1[0]);
  };
  const handleSliderChange = (newRange) => {
    setRange(newRange);
  };
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
  const formatCurrency = (value) => `$${value}`;
  return (
    <section className="product-shop spad">
      <div className="container">
        <div className="row">
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
                  sideBarData.brands.map((brand, index) => (
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
                  sideBarData.colors.map((color, index) => (
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
          <div className="col-lg-9 order-1 order-lg-2">
            <div className="product-show-option">
              <div className="row">
                <div className="col-lg-7 col-md-7">
                  <div className="select-option">
                    <Select
                      className="sorting"
                      options={options1}
                      value={selectedOption1}
                      onChange={handleOptionChange1}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          fontWeight: "bold",
                          width: "200px", // Set a fixed width (you can adjust the value)
                        }),
                      }}
                    ></Select>
                    <Select
                      className="p-show"
                      options={options2}
                      value={selectedOption2}
                      onChange={handleOptionChange2}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: "100%", // Set a fixed width (you can adjust the value)
                          fontWeight: "bold",
                        }),
                      }}
                    >
                      {/* <option value="">Show:</option> */}
                    </Select>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-right">
                  <p>Show 01 - {selectedOption2.value} Of 36 Product</p>
                </div>
              </div>
            </div>
            {data.content && data.content.length > 0 && (
              <ListProduct data={data.content} />
            )}
            <PaginationControl
              page={page}
              between={4}
              total={15}
              limit={5}
              changePage={(page) => {
                setPage(page);
                console.log(page);
              }}
              ellipsis={1}
              className="my-custom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage;
