import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function SmallCart({ updateCartValue }) {
  const [data, setData] = useState({});
  const [price, setPrice] = useState(0);
  const [prevLocalStorageState, setPrevLocalStorageState] = useState(
    localStorage.getItem("update")
  );
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      page: 1,
      limit: 10,
    };
    const fetchData = async () => {
      try {
        if (userToken) {
          const path = "authen/cart/showFullCart";
          const method = "POST";
          const result = await makeRequest(
            method,
            path,
            APIdata,
            axiosInstance
          );
          const itemCount = result.content.length;
          const filteredData = result.content.map((item) => ({
            name: item.name,
            sellingPrice: item.sellingPrice,
            discount: item.discount,
            image1: item.image1,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          }));

          const totalPriceSum = filteredData.reduce(
            (acc, item) => acc + item.totalPrice * item.quantity,
            0
          );
          updateCartValue(itemCount);
          setData(filteredData);
          setPrice(totalPriceSum);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    const checkLocalStorage = () => {
      const currentLocalStorageState = localStorage.getItem("update");

      if (currentLocalStorageState !== prevLocalStorageState) {
        // If there's a change, reload the page
        setPrevLocalStorageState(currentLocalStorageState);
      }
    };
    const intervalId = setInterval(checkLocalStorage, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [prevLocalStorageState, updateCartValue]);
  localStorage.setItem("update", 0);
  return (
    <div className="cart-hover">
      <div className="select-items">
        <table>
          <tbody>
            {Object.keys(data).length !== 0 &&
              data.map((data, index) => (
                <tr key={index}>
                  <td className="si-pic">
                    <img
                      src={data.image1}
                      alt=""
                      style={{ maxWidth: "70px", maxHeight: "70px" }}
                    />
                  </td>
                  <td className="si-text">
                    <div className="product-selected">
                      <h6>{data.name}</h6>
                      <h6 style={{ marginTop: "5px" }}>
                        Discount: {data.discount}%
                      </h6>
                      <p>
                        ${data.sellingPrice} x {data.quantity}
                      </p>
                    </div>
                  </td>
                  <td className="si-close">
                    <i className="ti-close"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="select-total">
        <span>total:</span>
        <h5>${price}</h5>
      </div>
      <div className="select-button">
        <Link to={`/cart`} className="primary-btn view-card">
          VIEW CARD
        </Link>
        <a href={{}} className="primary-btn checkout-btn">
          CHECK OUT
        </a>
      </div>
    </div>
  );
}

export default SmallCart;
