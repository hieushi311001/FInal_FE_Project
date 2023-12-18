import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function AdminInvoiceDetailPage() {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [adminAction, setAdminAction] = useState("");
  const userToken = Cookies.get("jwtTokenAdmin");
  const [yourTextBoxValue, setYourTextBoxValue] = useState("");
  const axiosInstance = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `authen/invoice/invoice_id=${params.invoice_id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        const total = result.content.reduce((acc, product) => {
          return acc + (product.sellingPrice * product.quantity || 0); // Đảm bảo price có giá trị và chuyển đổi về số
        }, 0);
        console.log(result);
        setPrice(total);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [params.invoice_id, userToken]);
  const handleTextBoxChange = (event) => {
    setYourTextBoxValue(event.target.value);
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleUserStatus = (event) => {
    console.log(event.target.value);
    setAdminAction(event.target.value);
    setYourTextBoxValue("");
  };
  const handleReturn = () => {};
  const handleConfirm = (e) => {
    const fetchData = async () => {
      const APIdata = {
        id: params.invoice_id,
        // reason: yourTextBoxValue,
        adminAction: adminAction,
      };
      try {
        const path = `authen/invoice/processOrder`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  return (
    <div className="centered-content">
      <div className="checkout-form">
        <div className="col-lg-6">
          <div className="place-order">
            <h4>Invoice ID: {params.invoice_id}</h4>
            <div className="order-total">
              <ul className="order-table">
                <li>
                  Product <span>Total</span>
                </li>
                {Object.keys(data).length !== 0 &&
                  data.content.map((data, index) => (
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
                <li className="total-price">
                  Total <span>${price.toFixed(2)}</span>
                </li>
                {adminAction === "REFUSED" ? (
                  <input
                    type="text"
                    placeholder="Enter something..."
                    value={yourTextBoxValue}
                    onChange={handleTextBoxChange}
                    style={{ marginTop: "10px", width: "100%" }}
                  />
                ) : null}
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      padding: "10px 0px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <input
                      type="radio"
                      id="pc-momo1"
                      name="paymentMethod"
                      value="ACCEPTED"
                      checked={adminAction === "ACCEPTED"}
                      onChange={handleUserStatus}
                    />
                    <label style={{ marginLeft: "5px" }}>Accepted</label>

                    <input
                      type="radio"
                      id="pc-momo2"
                      name="paymentMethod"
                      value="REFUSED"
                      checked={adminAction === "REFUSED"}
                      onChange={handleUserStatus}
                    />
                    <label style={{ marginLeft: "5px" }}>Refused</label>

                    <input
                      type="radio"
                      id="pc-momo3"
                      name="paymentMethod"
                      value="CONFIRMED_ONLINE_PAYMENT"
                      checked={adminAction === "CONFIRMED_ONLINE_PAYMENT"}
                      onChange={handleUserStatus}
                    />
                    <label style={{ marginLeft: "5px" }}>
                      Confirm Online Payment
                    </label>

                    <input
                      type="radio"
                      id="pc-momo4"
                      name="paymentMethod"
                      value="FINISH_PACKING"
                      checked={adminAction === "FINISH_PACKING"}
                      onChange={handleUserStatus}
                    />
                    <label style={{ marginLeft: "5px" }}>Finish Packing</label>
                  </div>
                </div>
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
