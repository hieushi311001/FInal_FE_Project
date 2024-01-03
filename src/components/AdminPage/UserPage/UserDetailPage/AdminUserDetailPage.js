import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useParams, Link } from "react-router-dom";
function AdminUserDetailPage() {
  const params = useParams();
  const [data, setData] = useState({});
  const [userStatus, setUserStatus] = useState("");
  const userToken = Cookies.get("jwtTokenAdmin");
  useEffect(() => {
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const path = `authen/account/account_id=${params.user_id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
        setData(result.content);
        setUserStatus(result.content.status);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [params.user_id, userToken]);
  const handleUserStatus = (event) => {
    setUserStatus(event.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const APIdata = {
          id: params.user_id,
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
                  <div>{data.userName}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="main-card mb-3 card">
                  <div className="card-body">
                    <form>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="image"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Avatar
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <img
                            style={{
                              height: 200,
                              width: 200,
                              cursor: "pointer",
                            }}
                            className="thumbnail rounded-circle"
                            src={`https://drive.google.com/uc?export=view&id=${data.avatar}`}
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
                            value={data.userName}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="email"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.email}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="password"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Phone Number
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.phoneNumber}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="company_name"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.address}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="country"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          City
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.city}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <label
                          htmlFor="street_address"
                          className="col-md-3 text-md-right col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-md-9 col-xl-8">
                          <input
                            readOnly
                            className="form-control"
                            value={data.country}
                          />
                        </div>
                      </div>
                      <div className="position-relative row form-group">
                        <div style={{ padding: "0px 200px" }}>
                          <input
                            type="radio"
                            id="pc-momo"
                            name="paymentMethod"
                            value="ALLOWED"
                            checked={userStatus === "ALLOWED"}
                            onChange={handleUserStatus}
                          />
                          <label style={{ marginLeft: "5px" }}>Allow</label>
                          <input
                            type="radio"
                            id="pc-momo"
                            name="paymentMethod"
                            value="BANNED"
                            checked={userStatus === "BANNED"}
                            onChange={handleUserStatus}
                          />
                          {console.log(userStatus)}
                          <label style={{ marginLeft: "5px" }}>Ban</label>
                        </div>
                      </div>

                      <div className="position-relative row form-group mb-1">
                        <div className="col-md-9 col-xl-8 offset-md-2">
                          <Link
                            to={"/admin/user"}
                            className="border-0 btn btn-outline-danger mr-1"
                          >
                            <span className="btn-icon-wrapper pr-1 opacity-8">
                              <i className="fa fa-times fa-w-20" />
                            </span>
                            <span>Cancel</span>
                          </Link>
                          <button
                            className="btn-shadow btn-hover-shine btn btn-primary"
                            onClick={handleSave}
                          >
                            <span className="btn-icon-wrapper pr-2 opacity-8">
                              <i className="fa fa-download fa-w-20" />
                            </span>
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* End Main */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserDetailPage;
