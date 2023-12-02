import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import React, { useEffect, useState } from "react";

function SmallCart() {
  const [data, setData] = useState({});
  const [price, setPrice] = useState(0);
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
      limit: 5,
    };
    const fetchData = async () => {
      try {
        const path = "authen/cart/showFullCart";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);

        const filteredData = result.content.map((item) => ({
          name: item.name,
          sellingPrice: item.sellingPrice,
          discount: item.discount,
          image1: item.image1,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));
        const totalPriceSum = filteredData.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );
        setData(filteredData);
        setPrice(totalPriceSum);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="cart-hover">
      <div className="select-items">
        <table>
          <tbody>
            {Object.keys(data).length !== 0 &&
              data.map((data, index) => (
                <tr>
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
        <a href={{}} className="primary-btn view-card">
          VIEW CARD
        </a>
        <a href={{}} className="primary-btn checkout-btn">
          CHECK OUT
        </a>
      </div>
    </div>
  );
}

export default SmallCart;
