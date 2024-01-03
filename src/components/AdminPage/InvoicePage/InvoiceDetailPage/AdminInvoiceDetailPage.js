import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function AdminInvoiceDetailPage() {
  const params = useParams();
  console.log(params);
  const values = params.invoice_id.split("-");
  const id = values[0]; // Giá trị số
  const method = values[1]; // Chuỗi
  const status = values[2]; // Chuỗi
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [adminAction, setAdminAction] = useState("");
  const userToken = Cookies.get("jwtTokenAdmin");
  const [yourTextBoxValue, setYourTextBoxValue] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const path = `authen/invoice/invoice_id=${id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        const total = result.content.invoiceProducts.reduce((acc, product) => {
          return acc + (product.sellingPrice * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
        }, 0);
        console.log(result);
        setPrice(total);
        setData(result);
        setInvoiceDetail(result.content.invoice);
      } catch (error) {
        console.log(userToken);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, userToken]);
  const handleTextBoxChange = (event) => {
    setYourTextBoxValue(event.target.value);
  };
  const handleUserStatus = (event) => {
    console.log(event.target.value);
    setAdminAction(event.target.value);
    setYourTextBoxValue("");
  };
  const handleReturn = () => {
    navigate("/admin/invoice");
  };
  const handleConfirm = () => {
    const fetchData = async () => {
      const axiosInstance = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      };
      if (yourTextBoxValue !== "") {
        var APIdata = {
          id: id,
          reason: yourTextBoxValue,
          adminAction: adminAction,
        };
      } else {
        APIdata = {
          id: id,
          adminAction: adminAction,
        };
      }

      console.log(APIdata);
      try {
        const path = `authen/invoice/processOrder`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        navigate("/admin/invoice");
      } catch (error) {
        console.error("Error fetching data:", error);
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
              Invoice ID: {id} - {method}
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
                <li className="total-price">
                  Total <span>${price.toFixed(2)}</span>
                </li>
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
                {adminAction === "REFUSED" || adminAction === "FAILED" ? (
                  <input
                    type="text"
                    placeholder="Enter something..."
                    value={yourTextBoxValue}
                    onChange={handleTextBoxChange}
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                ) : null}

                {method === "COD" && status === "ACCEPTANCE_WAITING" ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div
                        style={{
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="ACCEPTED"
                            checked={adminAction === "ACCEPTED"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>Accepted</label>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="REFUSED"
                            checked={adminAction === "REFUSED"}
                            onChange={handleUserStatus}
                            style={{ marginLeft: "30px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>Refused</label>
                        </>
                      </div>
                    </div>
                  </div>
                ) : null}
                {status === "PAYMENT_WAITING" ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div
                        style={{
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="CONFIRMED_ONLINE_PAYMENT"
                            checked={adminAction === "CONFIRMED_ONLINE_PAYMENT"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>
                            Confirm Online Payment
                          </label>
                        </>
                      </div>
                    </div>
                  </div>
                ) : null}
                {status === "PACKING" ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div
                        style={{
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="FINISH_PACKING"
                            checked={adminAction === "FINISH_PACKING"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>
                            Finish Packing
                          </label>
                        </>
                      </div>
                    </div>
                  </div>
                ) : null}
                {status === "FINISH_PACKING" ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div
                        style={{
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="SHIPPING"
                            checked={adminAction === "SHIPPING"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>Shipping</label>
                        </>
                      </div>
                    </div>
                  </div>
                ) : null}
                {status === "SHIPPING" ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <div
                        style={{
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                        }}
                      >
                        <>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="SUCCESS"
                            checked={adminAction === "SUCCESS"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>Success</label>
                          <input
                            type="radio"
                            id="pc-momo4"
                            name="paymentMethod"
                            value="FAILED"
                            checked={adminAction === "FAILED"}
                            onChange={handleUserStatus}
                            style={{ margin: "10px" }}
                          />
                          <label style={{ marginLeft: "5px" }}>Failed</label>
                        </>
                      </div>
                    </div>
                  </div>
                ) : null}
              </ul>

              <div className="order-btn">
                <button
                  onClick={handleReturn}
                  className="site-btn place-btn"
                  style={{ marginRight: "5px" }}
                >
                  Return
                </button>
                <button onClick={handleConfirm} className="site-btn place-btn">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInvoiceDetailPage;
