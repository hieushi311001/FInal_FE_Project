import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { makeRequest } from "~/services";
import Button from "./Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function PopupPage({ isOpen, onClose, product }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(product.quantity);
  const [selectedImage, setSelectedImage] = useState({
    name: product.name,
    id: product.id,
    productId: product.productId,
    src: product.image1,
    color: product.color,
    size: product.size,
    quantity: product.quantity,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `unauthen/shop/product_id=${product.productId}`;
        const method = "GET";
        const result = await makeRequest(method, path);

        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [product.productId]);

  const handleImageClick = (
    imageName,
    imageProductId,
    imageSrc,
    imageColor,
    imageSize
  ) => {
    setSelectedImage({
      ...selectedImage,
      name: imageName,
      productId: imageProductId,
      src: imageSrc,
      color: imageColor,
      size: imageSize,
    });
  };
  const handleChangeButtonClick = (id, productId, color, size) => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      objectList: [
        {
          productId: productId,
          cartId: id,
          color: color,
          size: size,
          quantity: value,
          selectStatus: 1,
        },
      ],
    };
    const fetchData = async () => {
      try {
        const path = `authen/cart/update`;
        const method = "POST";
        await makeRequest(method, path, APIdata, axiosInstance);
        navigate(0);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };

  const increment = () => {
    if (value < 20) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      <div className="custom-modal">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <div className="content">
          <div className="left-panel">
            <h6>
              {selectedImage.name}
              {selectedImage.color !== "none" && (
                <span>
                  {" "}
                  - Color: {capitalizeFirstLetter(selectedImage.color)}
                </span>
              )}
              {selectedImage.size !== "none" && (
                <span>
                  {" "}
                  - Size: {capitalizeFirstLetter(selectedImage.size)}
                </span>
              )}
            </h6>
            <img
              src={selectedImage.src}
              style={{ width: "70%", height: "70%" }}
              alt="Selected"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="quantity"
                style={{ margin: "8px", justifyContent: "center" }}
              >
                Select quantity:
              </label>
              <div className="pro-qty">
                <span className="dec qtybtn" onClick={decrement}>
                  -
                </span>
                <input
                  type="text"
                  value={value}
                  readOnly
                  style={{ color: "black" }}
                />
                <span className="inc qtybtn" onClick={increment}>
                  +
                </span>
              </div>
            </div>
          </div>
          <div className="right-panel">
            {/* Content for the right panel */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {Object.keys(data).length !== 0 &&
                data.map((product) => (
                  <div
                    key={product.id}
                    style={{ display: "flex", marginBottom: "20px" }}
                  >
                    {product.id && (
                      <img
                        src={product.image1}
                        style={{ width: "50%" }}
                        alt={product.id}
                        onClick={() =>
                          handleImageClick(
                            product.name,
                            product.productId,
                            product.image1,
                            product.color,
                            product.size
                          )
                        }
                      />
                    )}

                    <div className="details" style={{ marginLeft: "10px" }}>
                      {product.color !== "none" && (
                        <div>
                          <strong>Color:</strong>{" "}
                          {capitalizeFirstLetter(product.color)}
                        </div>
                      )}

                      {product.size !== "none" && (
                        <div>
                          <strong>Size:</strong>{" "}
                          {capitalizeFirstLetter(product.size)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="button-container">
              <Button
                label="Change"
                id={selectedImage.id}
                productId={selectedImage.productId}
                color={selectedImage.color}
                size={selectedImage.size}
                onClick={handleChangeButtonClick}
              />
              <Button label="Cancel" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default PopupPage;
