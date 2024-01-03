import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useLocation, useParams } from "react-router-dom";
function AddColor() {
  const [data, setData] = useState({});
  const location = useLocation();
  const params = useParams();
  const userToken = Cookies.get("jwtTokenAdmin");
  const initialImages = ["", "", "", ""];
  const [images, setImages] = useState(initialImages);
  const [sizes, setSizes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [proColor, setProColor] = useState("none");
  const values = params.id_color.split("_");
  const id = values[0];
  const color = values[1];
  const [cate, setCate] = useState("");
  useEffect(() => {
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = `unauthen/shop/product_id=${id}?showFull=true`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
        const product = result.content.filter(
          (product) => product.color === color
        );
        let idArray = result.content[0].categories.map((item) => item.id);
        setCate(idArray);
        setData(product[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, color, userToken]);
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
  const handleColorChange = (event) => {
    setProColor(event.target.value);
  };
  const handleNumberInputChange = (event) => {
    const inputValue = event.target.value;
    const numberArray = inputValue
      .split(",")
      .map((number) => parseInt(number.trim(), 10));
    setNumbers(numberArray);
  };
  const handleSave = () => {
    const fetchData = async () => {
      try {
        const APIdata = {
          id: id,
          name: data.name,
          sellingPrice: data.sellingPrice,
          originalPrice: data.originalPrice,
          discount: data.discount,
          brand: data.brand,
          categoryIds: cate,
          attributes: [
            {
              color: proColor,
              sizes: sizes,
              quantity: numbers,
              images: images,
            },
          ],
          description: data.description,
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  return (
    <div>
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
        <div key={index} className="position-relative row form-group">
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
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
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
          For add size: s,m,l quantity is 1,2,3 (1 for s, 2 for m, 3 for l)
        </label>
      </div>

      <div className="position-relative row form-group">
        <label className="col-md-9 col-xl-8 offset-md-3">
          <button
            className="btn-shadow btn-hover-shine btn btn-primary"
            onClick={handleSave}
          >
            <span className="btn-icon-wrapper pr-2 opacity-8">
              <i className="fa fa-download fa-w-20" />
            </span>
            <span>Save</span>
          </button>
        </label>
      </div>
      <div className="position-relative row form-group">
        <hr
          className="col-md-9 col-xl-8 offset-md-3"
          style={{ borderColor: "black" }}
        />
      </div>
    </div>
  );
}

export default AddColor;
