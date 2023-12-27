import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
function AdminProductAddPage() {
  const [userStatus, setUserStatus] = useState("");
  const navigate = useNavigate();
  const userToken = Cookies.get("jwtTokenAdmin");
  const initialImages = ["imageUrl1", "imageUrl2", "imageUrl3", "imageUrl4"];
  const [images, setImages] = useState(initialImages);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [orgPrice, setOrgPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [des, setDes] = useState("");
  const [proColor, setProColor] = useState();
  const [sizes, setSizes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const handleSave = (e) => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const APIdata = {
          name: name,
          sellingPrice: sellPrice,
          originalPrice: orgPrice,
          discount: discount,
          brand: brand,
          attributes: [
            {
              color: proColor,
              sizes: sizes,
              quantity: numbers,
              images: images,
            },
          ],
          description: des,
          importDate: formattedDate,
        };
        console.log(APIdata);
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const path = `authen/product/add`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        navigate("/admin/product");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handleOrgPriceChange = (event) => {
    setOrgPrice(event.target.value);
  };
  const handleSellPriceChange = (event) => {
    setSellPrice(event.target.value);
  };
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };
  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };
  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };
  const handleDesChange = (event) => {
    setDes(event.target.value);
  };
  const handleColorChange = (event) => {
    setProColor(event.target.value);
  };
  const handleImageUrlChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  const handleSizeInputChange = (event) => {
    const inputValue = event.target.value;
    const sizeArray = inputValue.split(",").map((size) => size.trim());
    setSizes(sizeArray);
  };

  const handleNumberInputChange = (event) => {
    const inputValue = event.target.value;
    const numberArray = inputValue
      .split(",")
      .map((number) => parseInt(number.trim(), 10));
    setNumbers(numberArray);
  };
  return (
    <div className="container app-main">
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="fa fa-user" />
              </div>
              <div>Add Product</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Name
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="email"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Brand
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={brand}
                        onChange={handleBrandChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Original Price
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={orgPrice}
                        onChange={handleOrgPriceChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="country"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Selling Price
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={sellPrice}
                        onChange={handleSellPriceChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="country"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Discount
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={discount}
                        onChange={handleDiscountChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Length
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={length}
                        onChange={handleLengthChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Weight
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={weight}
                        onChange={handleWeightChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Height
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={height}
                        onChange={handleHeightChange}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Width
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={width}
                        onChange={handleWidthChange}
                      />
                    </div>
                  </div>

                  <div className="position-relative row form-group">
                    <label
                      htmlFor="street_address"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <textarea
                        className="form-control"
                        value={des}
                        onChange={handleDesChange}
                        style={{ height: "auto", overflow: "hidden" }}
                      />
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <hr
                      className="col-md-9 col-xl-8 offset-md-3"
                      style={{ borderColor: "black" }}
                    />
                  </div>
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Color
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        className="form-control"
                        value={proColor}
                        onChange={handleColorChange}
                      />
                    </div>
                  </div>
                  {images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="position-relative row form-group"
                    >
                      <label
                        htmlFor={`image_url_${index + 1}`}
                        className="col-md-3 text-md-right col-form-label"
                      >
                        ImageURL {index + 1}
                      </label>
                      <div className="col-md-9 col-xl-8">
                        <input
                          id={`image_url_${index + 1}`}
                          className="form-control"
                          value={imageUrl}
                          onChange={(e) =>
                            handleImageUrlChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div className="position-relative row form-group">
                    <label
                      htmlFor="company_name"
                      className="col-md-3 text-md-right col-form-label"
                    >
                      Edit Size
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <div className="row">
                        <div className="col-md-9 col-xl-8">
                          <div className="d-flex">
                            {/* Input 1 */}
                            <input
                              placeholder="s,m,l,xl,..."
                              className="form-control"
                              style={{ width: "100%" }}
                              onChange={handleSizeInputChange}
                            />
                            {/* Input 2 */}
                            <input
                              placeholder="1,2,3,4,..."
                              className="form-control ml-3"
                              style={{ width: "100%" }}
                              onChange={handleNumberInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative row form-group">
                    <label className="col-md-9 col-xl-8 offset-md-3">
                      For add size: s,m,l quantity is 1,2,3 (1 for s, 2 for m, 3
                      for l)
                    </label>
                  </div>
                  <div className="position-relative row form-group">
                    <hr
                      className="col-md-9 col-xl-8 offset-md-3"
                      style={{ borderColor: "black" }}
                    />
                  </div>
                </div>
                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <a
                      href={{}}
                      className="border-0 btn btn-outline-danger mr-1"
                    >
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20" />
                      </span>
                      <span>Cancel</span>
                    </a>
                    <button className="btn-shadow btn-hover-shine btn btn-primary">
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20" />
                      </span>
                      <span onClick={handleSave}>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminProductAddPage;
