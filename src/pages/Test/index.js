import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import "./Test.css";

const Test = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to open modal and set the selected product
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  const products = [
    { id: 1, name: "Product A", description: "Description of Product A" },
    { id: 2, name: "Product B", description: "Description of Product B" },
    // Add more products as needed
  ];

  return (
    <div>
      {/* Button to open modal for each product */}
      {products.map((product) => (
        <button key={product.id} onClick={() => openModal(product)}>
          Open Modal for {product.name}
        </button>
      ))}

      {/* Popup for displaying product details */}
      {selectedProduct && (
        <Popup open={true} modal nested onClose={closeModal}>
          <div className="custom-modal">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <div className="content">
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Test;
