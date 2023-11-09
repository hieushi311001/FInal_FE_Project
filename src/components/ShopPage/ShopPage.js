import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
import { makeRequest } from "~/services";
import Select from "react-select";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./ShopPage.css";
function ShopPage() {
  //   const [data, setData] = useState([]);
  //   const options1 = [
  //     { value: "option1-1", label: "Default Sorting" },
  //     { value: "option1-2", label: "Option 1-2" },
  //     { value: "option1-3", label: "Option 1-3" },
  //   ];

  //   // Define your options for the second dropdown
  //   const options2 = [
  //     { value: 5, label: "Show: 05" },
  //     { value: 12, label: "Show: 12" },
  //     { value: 15, label: "Show: 15" },
  //   ];
  //   const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  //   const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  //   useEffect(() => {
  //     const APIdata = {
  //       page: 1,
  //       limit: selectedOption2.value,
  //     };
  //     console.log(APIdata.limit);
  //     const fetchData = async () => {
  //       try {
  //         const path = `unauthen/shop/allProducts`;
  //         const method = "POST";
  //         const result = await makeRequest(method, path, APIdata);
  //         setData(result);
  //         console.log(result);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //     // }, [params.product_id]);
  //   }, [selectedOption2.value]);

  //   // State and handlers for the first dropdown

  //   const handleOptionChange1 = (selectedOption) => {
  //     setSelectedOption1(selectedOption);
  //   };

  //   // State and handlers for the second dropdown

  //   const handleOptionChange2 = (selectedOption) => {
  //     setSelectedOption2(selectedOption);
  //   };
  //   if (data === null) {
  //     return null; // Do nothing if data is null
  //   }
  //   return (
  //     <section className="product-shop spad">
  //       <div className="container">
  //         <div className="row">
  //           <SideBar />
  //           <div className="col-lg-9 order-1 order-lg-2">
  //             <div className="product-show-option">
  //               <div className="row">
  //                 <div className="col-lg-7 col-md-7">
  //                   <div className="select-option">
  //                     <Select
  //                       className="sorting"
  //                       options={options1}
  //                       value={selectedOption1}
  //                       onChange={handleOptionChange1}
  //                       styles={{
  //                         control: (provided, state) => ({
  //                           ...provided,
  //                           fontWeight: "bold",
  //                           width: "200px", // Set a fixed width (you can adjust the value)
  //                         }),
  //                       }}
  //                     >
  //                       {/* <option value="">Default Sorting</option> */}
  //                     </Select>
  //                     <Select
  //                       className="p-show"
  //                       options={options2}
  //                       value={selectedOption2}
  //                       onChange={handleOptionChange2}
  //                       styles={{
  //                         control: (provided, state) => ({
  //                           ...provided,
  //                           width: "100%", // Set a fixed width (you can adjust the value)
  //                           fontWeight: "bold",
  //                         }),
  //                       }}
  //                     >
  //                       {/* <option value="">Show:</option> */}
  //                     </Select>
  //                   </div>
  //                 </div>
  //                 <div className="col-lg-5 col-md-5 text-right">
  //                   <p>Show 01 - {selectedOption2.value} Of 36 Product</p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="product-list">
  //               <div className="row">
  //                 {Object.keys(data).length !== 0 &&
  //                   data.content.map((product, index) => (
  //                     <div className="col-lg-4 col-sm-6" key={index}>
  //                       <div className="product-item">
  //                         <div className="pi-pic">
  //                           <img src={product.image1} alt={product.name} />
  //                           {product.discount !== 0 && (
  //                             <div className="sale pp-sale">
  //                               {product.discount}%
  //                             </div>
  //                           )}
  //                           <div className="icon">
  //                             <i className="icon_heart_alt" />
  //                           </div>
  //                           <ul>
  //                             <li className="w-icon active">
  //                               <a href={{}}>
  //                                 <i className="icon_bag_alt" />
  //                               </a>
  //                             </li>
  //                             <li className="quick-view">
  //                               <Link to={`/product/${product.productId}`}>
  //                                 + Quick View
  //                               </Link>
  //                             </li>
  //                             <li className="w-icon">
  //                               <a href={{}}>
  //                                 <i className="fa fa-random" />
  //                               </a>
  //                             </li>
  //                           </ul>
  //                         </div>
  //                         <div className="pi-text">
  //                           <div className="catagory-name">{product.brand}</div>
  //                           <a href={{}}>
  //                             <h5>{product.name}</h5>
  //                           </a>
  //                           {product.discount !== 0.0 ? (
  //                             <div className="product-price">
  //                               {product.sellingPrice -
  //                                 (product.discount / 100) * product.sellingPrice}
  //                               $ <span>{product.sellingPrice}$</span>
  //                             </div>
  //                           ) : (
  //                             <div className="product-price-1">
  //                               <span>{product.sellingPrice}$</span>
  //                             </div>
  //                           )}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   ))}
  //               </div>
  //             </div>
  //             <div className="loading-more">
  //               <i className="icon_loading" />
  //               <a href={{}}>Loading More</a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  const [page, setPage] = useState(1);

  return (
    <PaginationControl
      page={page}
      between={4}
      total={250}
      limit={5}
      changePage={(page) => {
        setPage(page);
        console.log(page);
      }}
      ellipsis={1}
      className="my-custom"
    />
  );
}

export default ShopPage;
