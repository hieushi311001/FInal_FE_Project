import images from "~/assets/images";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { Link } from "react-router-dom";
import Select from "react-select";
import { PaginationControl } from "react-bootstrap-pagination-control";
function AdminUserPage() {
  const [data, setData] = useState({});
  const [typeUser, setTypeUser] = useState("CUSTOMER");
  const [page, setPage] = useState(1);
  const options = [
    { value: "CUSTOMER", label: "CUSTOMER" },
    { value: "ADMIN", label: "ADMIN" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  useEffect(() => {
    const userToken = Cookies.get("jwtTokenAdmin");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      page: page,
      limit: 5,
      type: selectedOption.value,
    };
    const fetchData = async () => {
      try {
        const path = `authen/account/allAccounts`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [typeUser, selectedOption, page]);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setPage(1);
  };
  return (
    <div className="app-main">
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="fa fa-user" />
              </div>
              <div>
                User
                <div className="page-title-subheading">
                  View, create, update, delete and manage.
                </div>
              </div>
            </div>
            <div className="page-title-actions">
              <a
                href="./user-create.html"
                className="btn-shadow btn-hover-shine mr-3 btn btn-primary"
              >
                <span className="btn-icon-wrapper pr-2 opacity-7">
                  <i className="fa fa-plus fa-w-20" />
                </span>
                Create
              </a>
            </div>
          </div>
        </div>
        <div className="row-1">
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="card-header">
                <form>
                  <div className="input-group">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search everything"
                      className="form-control"
                    />
                    <span className="input-group-append">
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search" />
                        &nbsp; Search
                      </button>
                    </span>
                    <Select
                      className="sorting"
                      options={options}
                      value={selectedOption}
                      onChange={handleOptionChange}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          fontWeight: "bold",
                          width: "200px",
                          marginLeft: "15px", // Set a fixed width (you can adjust the value)
                        }),
                      }}
                    ></Select>
                  </div>
                </form>
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="btn btn-focus">This week</button>
                    <button className="active btn btn-focus">Anytime</button>
                  </div>
                </div>
              </div>
              <div className="table-responsive-1">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th className="text-center">Level</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data).length !== 0 &&
                      data.map((data, index) => (
                        <tr>
                          <td
                            className="text-center text-muted"
                            style={{ verticalAlign: "middle" }}
                          >
                            #{data.id}
                          </td>
                          <td>
                            <div className="widget-content p-0">
                              <div className="widget-content-wrapper">
                                <div className="widget-content-left mr-3">
                                  <div className="widget-content-left">
                                    <img
                                      width={40}
                                      className="rounded-circle"
                                      data-toggle="tooltip"
                                      title="Image"
                                      data-placement="bottom"
                                      src={`https://drive.google.com/uc?export=view&id=${data.avatar}`}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="widget-content-left flex2"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <div className="widget-heading">
                                    {capitalizeFirstLetter(data.userName)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ verticalAlign: "middle" }}>
                            {data.email}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {typeUser}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {data.status === "ALLOWED" ? (
                              <div className="badge badge-success">
                                {data.status}
                              </div>
                            ) : (
                              <div className="badge badge-danger">
                                {data.status}
                              </div>
                            )}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <Link
                              to={`/admin/user/${data.accountId}`}
                              className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="d-block card-footer">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <PaginationControl
                    page={page}
                    between={1}
                    total={5}
                    limit={1}
                    changePage={(page) => {
                      setPage(page);
                    }}
                    ellipsis={1}
                    className="my-custom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Main */}
    </div>
  );
}

export default AdminUserPage;
