import images from "~/assets/images";
import React from "react";
import CountDown from "./CountDown";
function DealSection() {
  return (
    <section className="deal-of-week set-bg spad" data-setbg={images.timebg}>
      <div className="container">
        <div className="col-lg-6 text-center">
          <div className="section-title">
            <h2>Deal Of The Week</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              <br /> do ipsum dolor sit amet, consectetur adipisicing elit{" "}
            </p>
            <div className="product-price">
              $35.00
              <span>/ HanBag</span>
            </div>
          </div>
          <CountDown />
          <a href={{}} className="primary-btn">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default DealSection;
