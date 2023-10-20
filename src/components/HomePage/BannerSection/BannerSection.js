import images from "~/assets/images";
function BannerSection() {
  return (
    <div className="banner-section spad">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="single-banner">
              <img src={images.banner1} alt="" />
              <div className="inner-text">
                <h4>Men’s</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-banner">
              <img src={images.banner2} alt="" />
              <div className="inner-text">
                <h4>Women’s</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-banner">
              <img src={images.banner3} alt="" />
              <div className="inner-text">
                <h4>Kid’s</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerSection;
