import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import Select from "react-select";
import ListProduct from "./ListProduct";
import axios from "axios";
import Slider from "rc-slider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { PaginationControl } from "react-bootstrap-pagination-control";
import "./ShopPage.css";
import "./SideBar/SideBar.css";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ShopPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const [countProduct, setCountProduct] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState([500, 5000]);
  const [sideBarData, setSideBarData] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [isFilter, setIsFilter] = useState(false);
  const options1 = [
    { value: 1, label: "Default Sorting" },
    { value: 2, label: "Sorting A-Z" },
    { value: 3, label: "Sorting Z-A" },
  ];

  // Define your options for the second dropdown
  const options2 = [
    { value: 6, label: "Show: 06" },
    { value: 12, label: "Show: 12" },
    { value: countProduct, label: `Show: ${countProduct}` },
  ];

  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("query");
    if (searchQuery !== null) {
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
          setIsFilter(true);
        } catch (error) {
          console.error("Error fetching filtered data:", error.message);
        }
      };
      fetchData();
    } else {
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
          const count = await axios.get("unauthen/shop/totalProductsQuantity");
          const rebrands = sidebarResult.content.reduce(
            (uniqueNames, product) => {
              if (!uniqueNames.includes(product.brand)) {
                uniqueNames.push(product.brand);
              }
              return uniqueNames;
            },
            []
          );

          const brands = rebrands.map((brand) => brand);

          const prices = sidebarResult.content.reduce(
            (uniqueNames, product) => {
              if (!uniqueNames.includes(product.sellingPrice)) {
                uniqueNames.push(product.sellingPrice);
              }
              return uniqueNames;
            },
            []
          );
          setCountProduct(count.data.content);
          setCategory(response.data.content);
          setSideBarData({ brands, prices });
          setData(shopResult);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }

    // }, [params.product_id]);
  }, [selectedOption2.value, page, location.search]);

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
    setPage(1);
  };
  const handleSliderChange = (newRange) => {
    setRange(newRange);
  };
  const handleFilterClick = async () => {
    const APIdata = {
      filter: {
        name: "",
        brand: selectedBrand,
        minPrice: range[0],
        maxPrice: range[1],
        categories: filteredCategoryNames,
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
        setIsFilter(true);
      } catch (error) {
        console.error("Error fetching filtered data:", error.message);
      }
    };
    fetchData();
  };
  const formatCurrency = (value) => `$${value}`;
  const handleCategoryClick = (category) => {
    // Kiểm tra xem danh mục đã được chọn hay chưa
    const isSelected = selectedCategories.includes(category.id);

    // Nếu chưa được chọn, thêm vào mảng selectedCategories
    // Nếu đã được chọn, loại bỏ khỏi mảng selectedCategories
    setSelectedCategories((prevSelectedCategories) =>
      isSelected
        ? prevSelectedCategories.filter(
            (selectedId) => selectedId !== category.id
          )
        : [...prevSelectedCategories, category.id]
    );
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const filteredCategoryNames = category
    .filter((category) => selectedCategories.includes(category.id))
    .map((category) => category.name);
  const handleBrandChange = (selectedBrand) => {
    // If the selectedBrand is already the current selectedBrand, deselect it
    // Otherwise, select the clicked brand
    setSelectedBrand((prevSelectedBrand) =>
      prevSelectedBrand === selectedBrand ? null : selectedBrand
    );
  };
  const handleReturnDefault = () => {
    navigate(`/shop`);
  };
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
                    <li
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className={
                        selectedCategories.includes(category.id)
                          ? "selected"
                          : ""
                      }
                    >
                      <span
                        style={{
                          fontWeight: selectedCategories.includes(category.id)
                            ? 700
                            : "normal",
                          color: selectedCategories.includes(category.id)
                            ? "#e7ab3c"
                            : "#636363",
                        }}
                      >
                        {category.name}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="filter-widget">
              <h4 className="fw-title">Brand</h4>
              <div className="fw-brand-check">
                {Object.keys(data).length !== 0 &&
                  sideBarData.brands.map((brand, index) => (
                    <div key={index} className="bc-item">
                      <label htmlFor={`bc-${brand}`}>
                        {brand === "dolce&gabbana"
                          ? "Dolce&Gabbana"
                          : capitalizeFirstLetter(brand)}
                        <input
                          type="checkbox"
                          id={`bc-${brand}`}
                          checked={selectedBrand === brand}
                          onChange={() => handleBrandChange(brand)}
                        />
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  className="filter-btn"
                  style={{
                    marginBottom: "10px",
                    width: "165px", // Set a specific width for both buttons
                    fontSize: "14px",
                    color: "#ffffff",
                    fontWeight: 700,
                    background: "#e7ab3c",
                    padding: "7px 20px 5px",
                    borderRadius: "2px",
                    display: "inline-block",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleFilterClick}
                >
                  Filter
                </button>
                <button
                  className="filter-btn"
                  style={{
                    width: "165px", // Set the same width as the first button
                    fontSize: "14px",
                    color: "#ffffff",
                    fontWeight: 700,
                    background: "#252525",
                    padding: "7px 20px 5px",
                    borderRadius: "2px",
                    display: "inline-block",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleReturnDefault}
                >
                  Return Default
                </button>
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
                    {isFilter === false ? (
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
                      />
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 text-right">
                  {(page - 1) * selectedOption2.value > countProduct ? (
                    <p>
                      Show {(page - 1) * selectedOption2.value + 1} -{" "}
                      {countProduct} Of {countProduct} Product
                    </p>
                  ) : (
                    <p>
                      Show {(page - 1) * selectedOption2.value + 1} -{" "}
                      {page * selectedOption2.value > countProduct
                        ? countProduct
                        : page * selectedOption2.value}{" "}
                      Of {countProduct} Product
                    </p>
                  )}
                </div>
              </div>
            </div>
            {data.content && data.content.length > 0 && (
              <ListProduct data={data.content} />
            )}
            {console.log(Math.ceil(countProduct / selectedOption2.value))}

            <PaginationControl
              page={page}
              between={1}
              total={Math.ceil(countProduct / selectedOption2.value)}
              limit={1}
              changePage={(page) => {
                setPage(page);
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
