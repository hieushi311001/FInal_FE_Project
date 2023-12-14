import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import "./CartPage.css";
import PopupPage from "./PopupPage";
import { useNavigate } from "react-router";
import { removeFromCart } from "~/services";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function CartPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [activeIndices, setActiveIndices] = useState([]);

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
      limit: 10,
    };
    const fetchData = async () => {
      try {
        const path = "authen/cart/showFullCart";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        setActiveIndices((prevActiveIndices) => {
          const indicesToAdd = result.content
            .map((item, index) =>
              item.selectStatus === 1 && !prevActiveIndices.includes(index)
                ? index
                : null
            )
            .filter((index) => index !== null);

          return [...prevActiveIndices, ...indicesToAdd];
        });
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };
  const handleItemClick = (index) => {
    // Check if the index is already in the activeIndices array
    if (activeIndices.includes(index)) {
      // If yes, remove it
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };
  const calculateTotalPrice = () => {
    if (!data || data.length === 0) {
      return 0;
    }
    return activeIndices.reduce((total, index) => {
      const item = data[index];
      const discountedPrice =
        item.sellingPrice - item.sellingPrice * (item.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };
  const updateCart = () => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    const activeItems = data.filter((_, index) =>
      activeIndices.includes(index)
    );
    const inactiveItems = data.filter(
      (_, index) => !activeIndices.includes(index)
    );

    const objectListActive = activeItems.map((item) => ({
      productId: item.productId,
      cartId: item.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      selectStatus: 1, // Assuming you want select_status to be 1 for all items in objectList
    }));
    const objectListUnActive = inactiveItems.map((item) => ({
      productId: item.productId,
      cartId: item.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      selectStatus: 0, // Assuming you want select_status to be 1 for all items in objectList
    }));

    const requestBody = {
      objectList: [...objectListActive, ...objectListUnActive],
    };
    const fetchData = async () => {
      try {
        const path = `authen/cart/update`;
        const method = "POST";
        await makeRequest(method, path, requestBody, axiosInstance);
        navigate(0);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  const handleProceedToCheckout = () => {
    // Dữ liệu bạn muốn gửi kèm
    const activeItems = data.filter((_, index) =>
      activeIndices.includes(index)
    );
    const objectListActive = activeItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.sellingPrice,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      discount: item.discount,
    }));
    const dataToSend = objectListActive;

    navigate("/location", { state: { data: dataToSend } });
  };
  const handleRemove = (Id) => {
    removeFromCart(Id);
    navigate(0);
  };
  return (
    <section className="shopping-cart spad">
      {selectedProduct && (
        <PopupPage
          isOpen={!!selectedProduct}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th className="p-name">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>
                      <i className="ti-close" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).length !== 0 &&
                    data.map((data, index) => (
                      <tr
                        key={data.id}
                        className={`cart-product-item ${
                          activeIndices.includes(index) ? "active" : ""
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <td className="cart-pic first-row">
                          <img
                            src={data.image1}
                            alt=""
                            style={{ maxWidth: "170px", maxHeight: "170px" }}
                          />
                        </td>
                        <td className="cart-title first-row">
                          <h5>{data.name}</h5>
                          {data.size !== "none" && (
                            <h6>Size: {capitalizeFirstLetter(data.size)}</h6>
                          )}
                          {data.color !== "none" && (
                            <h6>Color: {capitalizeFirstLetter(data.color)}</h6>
                          )}

                          <button
                            key={data.id}
                            className="filter-btn"
                            style={{
                              fontSize: "14px",
                              color: "#ffffff",
                              fontWeight: 700,
                              background: "#e7ab3c",
                              padding: "5px 20px 5px",
                              borderRadius: "2px",
                              display: "inline-block",
                              textTransform: "uppercase",
                              border: "none",
                              cursor: "pointer",
                              marginTop: "20px",
                            }}
                            onClick={() => openModal(data)}
                          >
                            Change
                          </button>
                        </td>
                        <td className="p-price first-row">
                          ${data.sellingPrice.toFixed(2)}
                        </td>
                        <td className="qua-col first-row">
                          <div className="pro-qty">
                            <input type="text" value={data.quantity} readOnly />
                          </div>
                        </td>
                        <td className="total-discount first-row">
                          {data.discount}%
                        </td>
                        <td className="total-price first-row">
                          $
                          {(
                            (data.sellingPrice -
                              data.sellingPrice * (data.discount / 100)) *
                            data.quantity
                          ).toFixed(2)}
                        </td>

                        <td className="close-td first-row">
                          <i
                            onClick={() => handleRemove(data.id)}
                            className="ti-close"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="cart-buttons">
                  <Link to={`/shop`} className="primary-btn continue-shop">
                    Continue shopping
                  </Link>
                  <button onClick={updateCart} className="primary-btn up-cart">
                    Update cart
                  </button>
                </div>
                <div className="discount-coupon"></div>
              </div>
              <div className="col-lg-4 offset-lg-4">
                <div className="proceed-checkout">
                  <ul>
                    <li className="cart-total">
                      Total <span>${calculateTotalPrice().toFixed(2)}</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleProceedToCheckout}
                    className="proceed-btn"
                  >
                    PROCEED TO CHECK OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
