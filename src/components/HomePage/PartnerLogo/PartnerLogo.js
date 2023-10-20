import images from "~/assets/images";
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
function PartnerLogo() {
  const options = {
    loop: false,
    margin: 30,
    nav: false,
    items: 5,
    dots: false,
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoheight: "false",
    mouseDrag: false,
    autoplay: true,
    responsive: {
      0: {
        items: 3,
      },
      768: {
        items: 5,
      },
    },
  };
  return (
    <div className="partner-logo">
      <div className="container">
        <OwlCarousel className="logo-carousel owl-carousel" {...options}>
          <div className="logo-item">
            <div className="tablecell-inner">
              <img src={images.logo1} alt="" />
            </div>
          </div>
          <div className="logo-item">
            <div className="tablecell-inner">
              <img src={images.logo2} alt="" />
            </div>
          </div>
          <div className="logo-item">
            <div className="tablecell-inner">
              <img src={images.logo3} alt="" />
            </div>
          </div>
          <div className="logo-item">
            <div className="tablecell-inner">
              <img src={images.logo4} alt="" />
            </div>
          </div>
          <div className="logo-item">
            <div className="tablecell-inner">
              <img src={images.logo5} alt="" />
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
}

export default PartnerLogo;
