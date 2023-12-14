import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import images from "~/assets/images";
import "./CheckoutPage.css";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state.data;
  const fromWardCode = location.state.fromWardCode;
  const toWardCode = location.state.toWardCode;
  const fromDistrictId = location.state.fromDistrictId;
  const toDistrictId = location.state.toDistrictId;
  console.log(initialData);
  console.log(fromWardCode);
  console.log(toWardCode);
  console.log(fromDistrictId);
  console.log(toDistrictId);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [data, setData] = useState({});
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata_1 = {
      fromDistrictId: fromDistrictId,
      toDistrictId: toDistrictId,
    };
    const fetchData = async () => {
      try {
        const path_1 = "authen/cart/getGnhAvailableServiceList";
        const method_1 = "POST";
        const result_1 = await makeRequest(
          method_1,
          path_1,
          APIdata_1,
          axiosInstance
        );
        console.log(result_1.content[0].service_id);
        const APIdata_2 = {
          fromDistrictId: fromDistrictId,
          toDistrictId: toDistrictId,
          fromWardCode: fromWardCode,
          toWardCode: toWardCode,
          serviceId: result_1.content[0].service_id,
        };
        const path_2 = "authen/cart/checkout";
        const method_2 = "POST";
        const result_2 = await makeRequest(
          method_2,
          path_2,
          APIdata_2,
          axiosInstance
        );
        console.log(result_2);
        setData(result_2.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [fromDistrictId, toDistrictId, fromWardCode, toWardCode]);

  // Xử lý khi có thay đổi trong radio button
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleCheckOut = (e) => {
    e.preventDefault();
    const APIdata = {
      paymentMethod: paymentMethod,
    };
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      try {
        const path = `authen/invoice/addNewOrder`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        const orderIdMatch = result.content.match(/\d+/);
        const orderId = orderIdMatch ? parseInt(orderIdMatch[0], 10) : null;
        console.log("Order ID:", orderId);
        navigate("/payment", {
          state: {
            data: initialData,
            invoiceID: orderId,
            method: paymentMethod,
            total: data.total,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  };
  return (
    <section className="checkout-section spad">
      <div className="container centered-content">
        <form action="#" className="checkout-form">
          <div className="col-lg-6">
            <div className="place-order">
              <h4>Your Order</h4>
              <div className="order-total">
                <ul className="order-table">
                  <li>
                    Product <span>Total</span>
                  </li>
                  {Object.keys(initialData).length !== 0 &&
                    initialData.map((data, index) => (
                      <li className="fw-normal" key={index}>
                        <div className="order-item">
                          <div>
                            {data.name}, <br />
                            Size: {data.size} <br />
                            Quantity: {data.quantity}
                          </div>
                          <span className="order-price">
                            $
                            {(
                              (data.price -
                                data.price * (data.discount / 100)) *
                              data.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}

                  <>
                    <li className="total-price">
                      SubTotal <span>${data.subtotal}</span>
                    </li>
                    <li className="total-price">
                      Shipping Fee <span>${data.shippingFee}</span>
                    </li>
                    <li className="total-price">
                      Total <span>${data.total}</span>
                    </li>
                  </>
                </ul>
                <div className="payment-check">
                  <div className="pc-item">
                    <input
                      type="radio"
                      id="pc-check"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="pc-check">
                      <img
                        src={images.cod}
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        alt="COD"
                      />
                    </label>
                  </div>
                  <div className="pc-item">
                    <input
                      type="radio"
                      id="pc-paypal"
                      name="paymentMethod"
                      value="PAYPAL"
                      checked={paymentMethod === "PAYPAL"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="pc-paypal">
                      <img
                        src={images.paypal}
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        alt="Paypal"
                      />
                    </label>
                  </div>
                  <div className="pc-item">
                    <input
                      type="radio"
                      id="pc-momo"
                      name="paymentMethod"
                      value="MOMO"
                      checked={paymentMethod === "MOMO"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="pc-momo">
                      <img
                        src={images.momo}
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        alt="Momo"
                      />
                    </label>
                  </div>
                  <div className="pc-item">
                    <input
                      type="radio"
                      id="pc-bank"
                      name="paymentMethod"
                      value="BANK_TRANSFER"
                      checked={paymentMethod === "BANK_TRANSFER"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="pc-bank">
                      <img
                        src={images.bank}
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        alt="Momo"
                      />
                    </label>
                  </div>
                </div>

                <div className="order-btn">
                  <button
                    onClick={handleCheckOut}
                    className="site-btn place-btn"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;
