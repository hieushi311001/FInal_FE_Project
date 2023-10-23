import OwlCarousel from "react-owl-carousel";
import React, { useState, useEffect } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
function ProductImage({ image1, image2, image3, image4 }) {
  const [activeImage, setActiveImage] = useState();
  const imageUrls = [
    image1,
    image2,
    image3,
    image4,
    // Add more URLs as needed
  ];
  // useEffect(() => {
  //   // Thực hiện hành động sau mỗi lần activeImage thay đổi
  //   console.log("Hình ảnh đã thay đổi:", activeImage);
  //   console.log("thay đổi:", image1);
  //   setActiveImage(image1);
  //   // Thực hiện hành động của bạn ở đây
  // }, [activeImage, image1]);
  useEffect(() => {
    // Thực hiện hành động sau mỗi lần activeImage thay đổi
    // console.log("Hình ảnh đã thay đổi:", activeImage);
    // console.log("thay đổi:", image1);
    setActiveImage(image1);
    // Thực hiện hành động của bạn ở đây
  }, [image1]);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    items: 3,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoheight: "false",
    autoplay: false,
  };
  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const [checkZoom, setcheckZoom] = useState(false);
  const TurmOnZoom = () => {
    // Chuyển đổi trạng thái zoom
    setcheckZoom(!checkZoom);
  };

  return (
    <div className="col-lg-6">
      {checkZoom ? (
        <div className="product-pic-zoom">
          <GlassMagnifier
            className="product-big-img"
            imageSrc={activeImage}
            imageAlt="Example"
            magnifierSize={150}
            zoomFactor={3}
            magnifierBorderSize={1}
            magnifierBorderColor="rgba(255, 255, 255, 0.8)"
            lensStyle={{
              borderRadius: "50%", // Make the lens circular
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          />
          <div className="zoom-icon" onClick={TurmOnZoom}>
            <i className="fa fa-search-minus" />
          </div>
        </div>
      ) : (
        <div className="product-pic-zoom">
          <img className="product-big-img-1" src={activeImage} alt="" />
          <div className="zoom-icon" onClick={TurmOnZoom}>
            <i className="fa fa-search-plus" />
          </div>
        </div>
      )}
      <div className="product-thumbs">
        <OwlCarousel
          className="product-thumbs-track ps-slider owl-carousel"
          {...options}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className={`pt ${imageUrl === activeImage ? "active" : ""}`}
              data-imgbigurl={imageUrl}
              onClick={() => handleImageClick(imageUrl)}
            >
              <img src={imageUrl} alt="" />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default ProductImage;
