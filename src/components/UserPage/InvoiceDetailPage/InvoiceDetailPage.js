import { useParams, useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
function InvoiceDetailPage() {
  const params = useParams();
  const values = params.invoice_id.split("-");
  const id = values[0]; // Giá trị số
  const method = values[1]; // Chuỗi
  const status = values[2]; // Chuỗi
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [transInfor, setTransInfor] = useState({});
  const [invoiceDetail, setInvoiceDetail] = useState({});
  console.log(status);
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
        if (method !== "COD" && status === "UNPAID") {
          const path2 = `authen/invoice/onlinePayment`;
          const method2 = "POST";
          const result2 = await makeRequest(
            method2,
            path2,
            APIdata2,
            axiosInstance
          );

          console.log(result2);
          setTransInfor(result2.content);
        }

        console.log(result1);

        const total = result1.content.invoiceProducts.reduce((acc, product) => {
          return acc + (product.sellingPrice * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
        }, 0);
        console.log(result1);
        setPrice(total);
        setData(result1);
        setInvoiceDetail(result1.content.invoice);
      } catch (error) {
        console.error("Error fetching data:", error.data);
      }
    };

    fetchData();
  }, [id, method, status]);
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
  function formatDateString(inputDateString) {
    const originalDate = new Date(inputDateString);

    if (isNaN(originalDate.getTime())) {
      console.error("Invalid date string");
      return null;
    }

    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();

    const formattedString = `00:00 ${day}-${month}-${year}`;
    return formattedString;
  }
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
                  data.content.invoiceProducts.map((data, index) => (
                    <li className="fw-normal" key={index}>
                      <div className="order-item">
                        <img
                          src={data.image1}
                          alt="Product"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          {data.name} <br />
                          Size: {data.size} <br />
                          Quantity: {data.quantity}
                        </div>
                        <span className="order-price">
                          ${(data.sellingPrice * data.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                {Object.keys(invoiceDetail).length !== 0 &&
                invoiceDetail.delivery !== null ? (
                  <li className="total-price">
                    <div className="order-item">
                      <div style={{ fontSize: "12px" }}>
                        Invoice Date: <br />
                        Address: <br />
                        Expected Delivery Time:
                      </div>
                      <div style={{ textAlign: "right", fontSize: "12px" }}>
                        {formatDateString(invoiceDetail.invoiceDate)} <br />
                        {invoiceDetail.address} <br />
                        {formatDateString(
                          invoiceDetail.delivery.expectedDeliveryTime
                        )}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="total-price">
                    <div className="order-item">
                      <div style={{ fontSize: "12px" }}>
                        Invoice Date: <br />
                        Address: <br />
                      </div>
                      <div style={{ textAlign: "right", fontSize: "12px" }}>
                        {formatDateString(invoiceDetail.invoiceDate)} <br />
                        {invoiceDetail.address} <br />
                      </div>
                    </div>
                  </li>
                )}
                <li className="total-price">
                  <div className="order-item">
                    <div style={{ fontSize: "12px" }}>
                      Admin Acceptance: <br />
                      Order Status: <br />
                      Payment Method: <br />
                      Reason: <br />
                    </div>
                    <div style={{ textAlign: "right", fontSize: "12px" }}>
                      {invoiceDetail.adminAcceptance} <br />
                      {invoiceDetail.orderStatus}
                      <br />
                      {invoiceDetail.paymentMethod} <br />
                      {invoiceDetail.reason} <br />
                    </div>
                  </div>
                </li>
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
