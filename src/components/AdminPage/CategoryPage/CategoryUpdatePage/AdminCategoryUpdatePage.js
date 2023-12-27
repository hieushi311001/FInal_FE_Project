import { makeRequest } from "~/services";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function AdminCateogryUpdatePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const handleSave = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("jwtTokenAdmin");
        const APIdata = {
          id: params.category_id,
          name: name,
          image: images,
        };
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        console.log(params.category_id);
        const path = `authen/category/update`;
        const method = "POST";
        await makeRequest(method, path, APIdata, axiosInstance);
        navigate("/admin/category");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleImageUrlChange = (value) => {
    console.log(value);
    setImages(value);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/admin/category");
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
              <div>Add Category</div>
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
                      htmlFor={`image_url`}
                      className="col-md-3 text-md-right col-form-label"
                    >
                      ImageURL
                    </label>
                    <div className="col-md-9 col-xl-8">
                      <input
                        id={`image_url`}
                        className="form-control"
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                      />
                    </div>
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
                      <span onClick={handleCancel}>Cancel</span>
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

export default AdminCateogryUpdatePage;
