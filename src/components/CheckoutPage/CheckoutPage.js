import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import "./CheckoutPage.css";

function CheckoutPage() {
  const location = useLocation();
  const initialData = location.state && location.state.data;

  // State để lưu giá trị của data và tổng giá tiền
  const [data, setData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = `authen/cart/checkout`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    // Tính tổng giá tiền của tất cả sản phẩm

    // Cập nhật giá trị tổng giá tiền
  }, []);

  // Xử lý khi có thay đổi trong radio button
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handlePayment = () => {};

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
                            ${(data.price * data.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}

                  <>
                    <li className="fw-normal">
                      Subtotal <span>{data.subtotal}</span>
                    </li>
                    <li className="fw-normal">
                      Shipping Fee <span>{data.shippingFee}</span>
                    </li>
                    <li className="total-price">
                      Total <span>{data.total}</span>
                    </li>
                  </>
                </ul>
                <div className="payment-check">
                  <div className="pc-item">
                    <label htmlFor="pc-check">
                      Cheque Payment
                      <input
                        type="radio"
                        id="pc-check"
                        name="paymentMethod"
                        value="cheque"
                        checked={paymentMethod === "cheque"}
                        onChange={handlePaymentMethodChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="pc-item">
                    <label htmlFor="pc-paypal">
                      Paypal
                      <input
                        type="radio"
                        id="pc-paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentMethodChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="pc-item">
                    <label htmlFor="pc-momo">
                      MoMo
                      <input
                        type="radio"
                        id="pc-momo"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={handlePaymentMethodChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div className="order-btn">
                  <button
                    onClick={handlePayment}
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
