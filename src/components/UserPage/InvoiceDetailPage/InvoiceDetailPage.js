import { useParams, useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
function InvoiceDetailPage() {
  const params = useParams();
  const match = params.invoice_id.match(/^(\d+)-([A-Za-z_]+)$/);
  const id = match[1]; // Giá trị số
  const method = match[2]; // Chuỗi
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [transInfor, setTransInfor] = useState({});
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      const APIdata2 = {
        id: id,
        paymentMethod: method,
      };
      try {
        const path1 = `authen/invoice/invoice_id=${id}`;
        const method1 = "GET";
        const result1 = await makeRequest(method1, path1, null, axiosInstance);
        const path2 = `authen/invoice/onlinePayment`;
        const method2 = "POST";
        const result2 = await makeRequest(
          method2,
          path2,
          APIdata2,
          axiosInstance
        );
        console.log(result1);
        console.log(result2);
        const updatedProducts = result1.content.map((product) => {
          // Check if discount is not equal to 0
          if (product.discount !== 0) {
            // Calculate discounted price
            const discountedPrice =
              product.sellingPrice -
              (product.sellingPrice * product.discount) / 100;
            // Update sellingPrice in the product object
            return { ...product, sellingPrice: discountedPrice };
          }
          return product; // No discount, return unchanged product
        });
        const total = updatedProducts.reduce((acc, product) => {
          return acc + (product.sellingPrice * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
        }, 0);
        setPrice(total);
        setTransInfor(result2.content);
        setData(updatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error.data);
      }
    };

    fetchData();
  }, [id, method]);
  const handleReturn = () => {
    navigate("/invoice");
  };
  const handleClick = () => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = `authen/invoice/cancel_order_id=${id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
        navigate("/invoice");
      } catch (error) {
        console.error("Error fetching data:", error.data);
      }
    };

    fetchData();
  };
  return (
    <div className="centered-content">
      <div className="checkout-form">
        <div className="col-lg-6">
          <div className="place-order">
            <h4>
              Your Invoice ID: {id} - {method}
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
                          ${(data.sellingPrice * data.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                {Object.keys(transInfor).length !== 0 && (
                  <>
                    {method !== "COD" && (
                      <>
                        <li className="total-price">
                          Receiver {method} Account{" "}
                          <span>{transInfor.receiverInfo.receiverAccount}</span>
                        </li>

                        <li className="total-price">
                          Receiver {method} Name{" "}
                          <span>{transInfor.receiverInfo.receiverName}</span>
                        </li>
                        <li className="total-price">
                          Payment Content <span>{transInfor.content}</span>
                        </li>
                        <li className="total-price">
                          Additional Information{" "}
                          <span>{transInfor.receiverInfo.additionalInfo}</span>
                        </li>
                      </>
                    )}
                  </>
                )}
                <li className="total-price">
                  Total <span>${(price + 1).toFixed(2)}</span>
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
                <button onClick={handleReturn} className="site-btn place-btn">
                  Return
                </button>
                <button
                  onClick={handleClick}
                  className="site-btn place-btn"
                  style={{ marginLeft: "10px" }}
                >
                  Cancel Invoice
                </button>
              </div>
              <div className="order-btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetailPage;
