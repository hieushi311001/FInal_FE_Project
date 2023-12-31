import images from "~/assets/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductSlider from "~/components/ProductSlider";
import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import { addToCart } from "~/services";
import { useNavigate } from "react-router-dom";
import { encodeAndSetCookie, getDecodedCookie } from "~/services";
import Cookies from "js-cookie";
function ManSection() {
  const navigate = useNavigate();
  const options = {
    loop: true,
    margin: 25,
    nav: true,
    items: 3,
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
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = "unauthen/shop/newArrivalProducts";
        const method = "GET";
        const result = await makeRequest(method, path);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleAddToCartForProduct = (productId, color, size, quantity) => {
    if (addToCart(productId, color, size, quantity)) {
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="man-banner spad">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <div className="filter-control"></div>
            {Object.keys(data).length !== 0 && (
              <OwlCarousel className="product-slider owl-carousel" {...options}>
                {data.content.map((product) => (
                  <ProductSlider
                    key={product.id}
                    productid={product.productId}
                    image={product.image1}
                    brand={product.brand}
                    name={product.name}
                    price={product.sellingPrice}
                    discount={product.discount}
                    color={product.color}
                    size={product.size}
                    quantity={1}
                    onAddToCart={() =>
                      handleAddToCartForProduct(
                        product.productId,
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
          <div className="col-lg-3 offset-lg-1">
            <div
              className="product-large set-bg m-large"
              data-setbg={images.manL}
            >
              <h2>New Arrival</h2>
              <a href={{}}>Discover More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManSection;
