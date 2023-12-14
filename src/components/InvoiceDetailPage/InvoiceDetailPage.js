import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "~/services";
import Cookies from "js-cookie";
function InvoiceDetailPage() {
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  console.log(params.invoice_id);
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
        const path = `authen/invoice/invoice_id=${params.invoice_id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        const updatedProducts = result.content.map((product) => {
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
        console.log(result);
        setData(updatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.invoice_id]);
  const handleReturn = () => {
    navigate("/invoice");
  };
  return (
    <div className="centered-content">
      <form className="checkout-form">
        <div className="col-lg-6">
          <div className="place-order">
            <h4>Your Invoice ID: {params.invoice_id}</h4>
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
                <li className="total-price">
                  Total <span>${price.toFixed(2)}</span>
                </li>
              </ul>

              <div className="order-btn">
                <button onClick={handleReturn} className="site-btn place-btn">
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InvoiceDetailPage;
