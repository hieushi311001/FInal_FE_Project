import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductSlider from "~/components/ProductSlider";
import axios from "axios";
import { addToCart } from "~/services";
import { useNavigate } from "react-router-dom";
function RelativeProduct({ productId, color }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    // Define the API endpoint you want to call
    // const apiUrl = "http://127.0.0.1:5000/recommendResults";
    const apiUrl =
      "https://absolutely-suitable-yak.ngrok-free.app/recommendResults";
    const APIdata = {
      product: `${productId}-${color}`,
    };
    axios
      .post(apiUrl, JSON.stringify(APIdata), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi khi gửi yêu cầu POST
        console.error("Lỗi khi gửi yêu cầu POST đến API: " + error);
      });
  }, [color, productId]);

  const options = {
    loop: true,
    margin: 25,
    nav: true,
    items: 5,
    dots: true,
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>',
    ],
    smartSpeed: 1000,
    autoheight: "false",
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  };
  const handleAddToCartForProduct = (productId, color, size, quantity) => {
    if (addToCart(productId, color, size, quantity)) {
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="related-products spad">
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Related Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-12 col-sm-9 mx-auto"
            style={{ minHeight: "466.06px", maxWidth: "1000px" }}
          >
            {data.content === undefined
              ? null
              : Object.keys(data.content).length !== 0 && (
                  <OwlCarousel
                    className="product-slider owl-carousel"
                    {...options}
                  >
                    {data.content.map((product) => (
                      <ProductSlider
                        key={product.id}
                        productid={product.product_id}
                        image={product.image1}
                        brand={product.brand}
                        name={product.name}
                        price={product.sellingPrice}
                        discount={product.discount}
                        onAddToCart={() =>
                          handleAddToCartForProduct(
                            product.product_id,
                            product.color,
                            product.size,
                            1
                          )
                        }
                      />
                    ))}
                  </OwlCarousel>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelativeProduct;
