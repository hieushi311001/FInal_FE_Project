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
  const initialData = location.state && location.state.data;

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const total = initialData.reduce((acc, product) => {
      return acc + (product.price * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
    }, 0);
    setPrice(total);
  }, [initialData]);

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
                            ${(data.price * data.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}

                  <>
                    <li className="total-price">
                      Total <span>${price.toFixed(2)}</span>
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
