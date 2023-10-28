import images from "~/assets/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductSlider from "~/components/ProductSlider";
import React, { useState, useEffect } from "react";
import { makeRequest } from "~/services";
function ManSection() {
  const options = {
    loop: true,
    margin: 25,
    nav: true,
    items: 4,
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
  return (
    <section className="man-banner spad">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <div className="filter-control">
              <ul>
                <li className="active">Clothings</li>
                <li>HandBag</li>
                <li>Shoes</li>
                <li>Accessories</li>
              </ul>
            </div>
            {/* <OwlCarousel className="product-slider owl-carousel" {...options}>
              <div className="product-item">
                <div className="pi-pic">
                  <img src={images.man1} alt="" />
                  <div className="sale">Sale</div>
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <a href={{}}>
                        <i className="icon_bag_alt" />
                      </a>
                    </li>
                    <li className="quick-view">
                      <a href={{}}>+ Quick View</a>
                    </li>
                    <li className="w-icon">
                      <a href={{}}>
                        <i className="fa fa-random" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">Coat</div>
                  <a href={{}}>
                    <h5>Pure Pineapple</h5>
                  </a>
                  <div className="product-price">
                    $14.00
                    <span>$35.00</span>
                  </div>
                </div>
              </div>
              <div className="product-item">
                <div className="pi-pic">
                  <img src={images.man2} alt="" />
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <a href={{}}>
                        <i className="icon_bag_alt" />
                      </a>
                    </li>
                    <li className="quick-view">
                      <a href={{}}>+ Quick View</a>
                    </li>
                    <li className="w-icon">
                      <a href={{}}>
                        <i className="fa fa-random" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">Shoes</div>
                  <a href={{}}>
                    <h5>Guangzhou sweater</h5>
                  </a>
                  <div className="product-price">$13.00</div>
                </div>
              </div>
              <div className="product-item">
                <div className="pi-pic">
                  <img src={images.man3} alt="" />
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <a href={{}}>
                        <i className="icon_bag_alt" />
                      </a>
                    </li>
                    <li className="quick-view">
                      <a href={{}}>+ Quick View</a>
                    </li>
                    <li className="w-icon">
                      <a href={{}}>
                        <i className="fa fa-random" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">Towel</div>
                  <a href={{}}>
                    <h5>Pure Pineapple</h5>
                  </a>
                  <div className="product-price">$34.00</div>
                </div>
              </div>
              <div className="product-item">
                <div className="pi-pic">
                  <img src={images.man4} alt="" />
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <a href={{}}>
                        <i className="icon_bag_alt" />
                      </a>
                    </li>
                    <li className="quick-view">
                      <a href={{}}>+ Quick View</a>
                    </li>
                    <li className="w-icon">
                      <a href={{}}>
                        <i className="fa fa-random" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">Towel</div>
                  <a href={{}}>
                    <h5>Converse Shoes</h5>
                  </a>
                  <div className="product-price">$34.00</div>
                </div>
              </div>
            </OwlCarousel> */}
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
