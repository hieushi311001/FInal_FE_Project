import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useLocation } from "react-router-dom";
function AdminProductEditPage() {
  const [data, setData] = useState({});
  const location = useLocation();
  const { id, color } = location.state || {};
  const [userStatus, setUserStatus] = useState("");
  const userToken = Cookies.get("jwtTokenAdmin");
  const [isChecked, setIsChecked] = useState(true);
  const initialImages = ["imageUrl1", "imageUrl2", "imageUrl3", "imageUrl4"];
  const [images, setImages] = useState(initialImages);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [orgPrice, setOrgPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [discount, setDiscount] = useState("");
  // const [length, setLength] = useState("");
  // // const [weight, setWeight] = useState("");
  // const [height, setHeight] = useState("");
  // // const [width, setWidth] = useState("");
  const [des, setDes] = useState("");
  const [dataFilter, setDataFilter] = useState({});
  const [proColor, setProColor] = useState(color);
  const [sizes, setSizes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = `authen/product/product_id=${id}?showFull=true`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
        const product = result.content.filter(
          (product) => product.color === color
        );
        const filteredSizesAndQuantities = product.map((product) => ({
          size: product.size,
          quantity: product.availableQuantity,
        }));
        setImages([
          product[0].image1,
          product[0].image2,
          product[0].image3,
          product[0].image4,
        ]);
        setDiscount(product[0].discount);
        setProColor(color);
        setData(product[0]);
        setName(product[0].name);
        setBrand(product[0].brand);
        setOrgPrice(product[0].originalPrice);
        setSellPrice(product[0].sellingPrice);
        setDes(product[0].description);
        setDataFilter(filteredSizesAndQuantities);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id, color, userToken]);
  const handleUserStatus = (event) => {
    setUserStatus(event.target.value);
  };
  const handleSave = (e) => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const APIdata = {
          id: id,
          name: name,
          sellingPrice: sellPrice,
          originalPrice: orgPrice,
          discount: discount,
          brand: brand,
          attributes: [
            {
              color: color,
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
        const path = `authen/product/edit`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        window.location.href = "/admin/product";
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleEdit = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
  };
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
  // const handleLengthChange = (event) => {
  //   setLength(event.target.value);
  // };
  // // const handleWeightChange = (event) => {
  // //   setWeight(event.target.value);
  // // };
  // const handleHeightChange = (event) => {
  //   setHeight(event.target.value);
  // };
  // // const handleWidthChange = (event) => {
  // //   setWidth(event.target.value);
  // // };
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
    <div>
      {Object.keys(data).length !== 0 && (
        <div className="container app-main">
          <div className="app-main__inner">
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  <div className="page-title-icon">
                    <i className="fa fa-user" />
                  </div>
                  <div>{data.name}</div>
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
                      {/* <div className="position-relative row form-group">
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
                      </div> */}
                      {/* <div className="position-relative row form-group">
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
                      </div> */}
                      {/* <div className="position-relative row form-group">
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
                      </div> */}
                      {/* <div className="position-relative row form-group">
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
                      </div> */}

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
                      {dataFilter.map((data, index) => (
                        <div
                          className="position-relative row form-group"
                          key={index}
                        >
                          <label
                            htmlFor="company_name"
                            className="col-md-3 text-md-right col-form-label"
                          >
                            Size
                          </label>
                          <div className="col-md-9 col-xl-8">
                            <div className="row">
                              <div className="col-md-9 col-xl-8">
                                <div className="d-flex">
                                  {/* Input 1 */}
                                  <input
                                    readOnly
                                    className="form-control"
                                    value={data.size}
                                    style={{ width: "100%" }}
                                  />
                                  {/* Input 2 */}
                                  <input
                                    readOnly
                                    className="form-control ml-3"
                                    value={data.quantity}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                              </div>
                            </div>
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
                          For add size: s,m,l quantity is 1,2,3 (1 for s, 2 for
                          m, 3 for l)
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
      )}
      ;
    </div>
  );
}
export default AdminProductEditPage;
