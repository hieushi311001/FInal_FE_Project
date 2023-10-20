import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import images from "~/assets/images";

const HeroSection = () => {
  useEffect(() => {
    // Set background image for each element with the 'set-bg' class
    document.querySelectorAll(".set-bg").forEach((element) => {
      const bg = element.getAttribute("data-setbg");
      element.style.backgroundImage = `url(${bg})`;
    });
  }, []); // Empty dependency array ensures that this effect runs once after the component mounts

  const owlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    dots: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoheight: "false",
    autoplay: true,
  };

  return (
    <section className="hero-section">
      <OwlCarousel className="hero-items" {...owlOptions}>
        <div className="single-hero-items set-bg" data-setbg={images.hero1}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <span>Bag, kids</span>
                <h1>Black friday</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                </p>
                <a href={{}} className="primary-btn">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="off-card">
              <h2>
                Sale <span>50%</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Another hero item */}
        <div className="single-hero-items set-bg" data-setbg={images.hero2}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <span>Bag, kids</span>
                <h1>Black friday</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                </p>
                <a href={{}} className="primary-btn">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="off-card">
              <h2>
                Sale <span>50%</span>
              </h2>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </section>
  );
};

export default HeroSection;
