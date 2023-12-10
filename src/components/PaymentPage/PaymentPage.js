import images from "~/assets/images";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeRequest, updateCart } from "~/services";
function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, invoiceID, method } = location.state || {};
  const [price, setPrice] = useState(0);
  const [resultData, setResultData] = useState({});
  useEffect(() => {
    const APIdata = {
      id: 14,
      paymentMethod: method,
    };
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    console.log(APIdata);
    const fetchData = async () => {
      try {
        updateCart();
        const path = `authen/invoice/onlinePayment`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        setResultData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    const total = data.reduce((acc, product) => {
      return acc + (product.price * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
    }, 0);
    setPrice(total);
  }, [invoiceID, method, data]);
  const handlePayment = () => {
    navigate("/");
  };
  return (
    <section className="checkout-section spad">
      <div className="container centered-content">
        <form action="#" className="checkout-form">
          <div className="col-lg-6">
            <div className="place-order">
              <h4>
                {resultData.content} - {method}
              </h4>
              <div className="order-total">
                <ul className="order-table">
                  <li>
                    Product <span>Total</span>
                  </li>
                  {Object.keys(data).length !== 0 &&
                    data.map((data, index) => (
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
                  {Object.keys(resultData).length !== 0 && (
                    <>
                      {method !== "COD" && (
                        <>
                          <li className="total-price">
                            Receiver {method} Account{" "}
                            <span>
                              {resultData.receiverInfo.receiverAccount}
                            </span>
                          </li>

                          <li className="total-price">
                            Receiver {method} Name{" "}
                            <span>{resultData.receiverInfo.receiverName}</span>
                          </li>

                          <li className="total-price">
                            Additional Information{" "}
                            <span>
                              {resultData.receiverInfo.additionalInfo}
                            </span>
                          </li>
                        </>
                      )}
                    </>
                  )}

                  <li className="total-price" style={{ marginBottom: "30px" }}>
                    Total <span>${price}</span>
                  </li>
                  {method === "COD" && (
                    <span className="total-price">
                      You will receive your order soon in the future. Thank you
                      for using my service!!
                    </span>
                  )}
                </ul>
                <div
                  className="payment-check-single"
                  style={{ textAlign: "center" }}
                >
                  {(() => {
                    switch (method) {
                      case "MOMO":
                        return (
                          <div
                            className="pc-item"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={images.momo}
                              style={{
                                maxHeight: "150px",
                                maxWidth: "150px",
                                display: "inline-block",
                                verticalAlign: "middle",
                                borderRadius: "10px",
                              }}
                              alt="Momo"
                            />
                          </div>
                        );
                      case "BANK_TRANSFER":
                        return (
                          <div
                            className="pc-item"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={images.tpbank}
                              style={{
                                maxHeight: "150px",
                                maxWidth: "150px",
                                display: "inline-block",
                                verticalAlign: "middle",
                                borderRadius: "10px",
                              }}
                              alt="Momo"
                            />
                          </div>
                        );

                      case "COD":
                        return (
                          <div
                            className="pc-item"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={images.cod}
                              style={{
                                maxHeight: "150px",
                                maxWidth: "150px",
                                display: "inline-block",
                                verticalAlign: "middle",
                                borderRadius: "10px",
                              }}
                              alt="COD"
                            />
                          </div>
                        );

                      case "PAYPAL":
                        return (
                          <div
                            className="pc-item"
                            style={{ textAlign: "center" }}
                          >
                            <img
                              src={images.paypal}
                              style={{
                                maxHeight: "150px",
                                maxWidth: "150px",
                                display: "inline-block",
                                verticalAlign: "middle",
                                borderRadius: "10px",
                              }}
                              alt="Palpal"
                            />
                          </div>
                        );

                      default:
                        return null; // hoặc nội dung mặc định khi method không phải là momo, cod hoặc paypal
                    }
                  })()}
                </div>
                <div className="order-btn">
                  <button
                    onClick={handlePayment}
                    className="site-btn place-btn"
                  >
                    Confirm Payment
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

export default PaymentPage;
