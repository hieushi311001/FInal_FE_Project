import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AddColor from "./AddColor";
function AdminProductDetailPage() {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState("");
  const userToken = Cookies.get("jwtTokenAdmin");
  const [isChecked, setIsChecked] = useState(true);
  const [dataFilter, setDataFilter] = useState({});
  const values = params.id_color.split("_");
  const id = values[0];
  const color = values[1];
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
        const product = result.content.filter(
          (product) => product.color === color
        );
        const filteredSizesAndQuantities = product.map((product) => ({
          size: product.size,
          quantity: product.availableQuantity,
        }));
        console.log(filteredSizesAndQuantities);
        setData(product[0]);
        setDataFilter(filteredSizesAndQuantities);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [color, id, userToken]);
  const handleSave = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const APIdata = {
          id: id,
          status: userStatus,
        };
        console.log(APIdata);
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const path = `authen/account/actionOnAccount`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        window.location.href = "/admin/user";
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
    navigate("/admin/product/edit", {
      state: {
        id: id,
        color: color,
      },
    });
  };
  const handleAddColor = () => {
    setIsChecked(!isChecked);
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
                  <div>
                    {data.name} - {capitalizeFirstLetter(data.color)}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mb-3 card">
                  <div className="card-body">
                    <div>
                      <div className="position-relative row form-group justify-content-center align-items-center">
                        <div className="col-md-12 col-xl-10 d-flex justify-content-center align-items-center">
                          <img
                            style={{
                              height: 200,
                              width: 200,
                              cursor: "pointer",
                            }}
                            className="thumbnail rounded-circle"
                            src={data.image1}
                            alt="Avatar"
                          />
                          <img
                            style={{
                              height: 200,
                              width: 200,
                              cursor: "pointer",
                            }}
                            className="thumbnail rounded-circle"
                            src={data.image2}
                            alt="Avatar"
                          />
                          <img
                            style={{
                              height: 200,
                              width: 200,
                              cursor: "pointer",
                            }}
                            className="thumbnail rounded-circle"
                            src={data.image3}
                            alt="Avatar"
                          />
                          <img
                            style={{
                              height: 200,
                              width: 200,
                              cursor: "pointer",
                            }}
                            className="thumbnail rounded-circle"
                            src={data.image4}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="name"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.name}
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
                            readOnly
                            className="form-control"
                            value={capitalizeFirstLetter(data.brand)}
                          />
                        </div>
                      </div>
                      {dataFilter.map((data, index) => (
                        <div
                          className="position-relative row form-group"
                          key={index}
                        >
                          <label
                            htmlFor="company_name"
                            className="col-md-3 text-md-right col-form-label"
                          >
                            Color
                          </label>
                          <div className="col-md-9 col-xl-8">
                            <div className="row">
                              <div className="col-md-9 col-xl-8">
                                <div className="d-flex">
                                  {/* Input 1 */}
                                  <input
                                    readOnly
                                    className="form-control"
                                    value={capitalizeFirstLetter(data.size)}
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
                          htmlFor="country"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Original Price
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.originalPrice}
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
                            readOnly
                            className="form-control"
                            value={data.sellingPrice}
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
                            readOnly
                            className="form-control"
                            value={data.description}
                            rows={Math.max(
                              3,
                              data.description.split("\n").length
                            )} // Đảm bảo hiển thị đủ dòng
                          />
                        </div>
                      </div>
                      {isChecked === false ? <AddColor /> : null}
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
                          <span onClick={handleEdit}>Edit</span>
                        </button>
                        <button
                          className="btn-shadow btn-hover-shine btn btn-primary"
                          style={{ marginLeft: "10px" }}
                        >
                          <span className="btn-icon-wrapper pr-2 opacity-8">
                            <i className="fa fa-download fa-w-20" />
                          </span>
                          <span onClick={handleAddColor}>Add Color</span>
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
    </div>
  );
}

export default AdminProductDetailPage;
