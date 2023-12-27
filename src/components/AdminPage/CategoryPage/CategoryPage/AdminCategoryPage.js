import { useState, useEffect } from "react";
import { makeRequest } from "~/services";
import { Link } from "react-router-dom";
function AdminCategoryPage() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = `unauthen/category/allCategories`;
        const method = "GET";
        const result = await makeRequest(method, path, null);
        console.log(result);
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="app-main">
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="fa fa-suitcase" />
              </div>
              <div>
                Category
                <div className="page-title-subheading">
                  View, create, update, delete and manage.
                </div>
              </div>
            </div>
            <div className="page-title-actions">
              <Link
                to={"/admin/category/add"}
                className="btn-shadow btn-hover-shine mr-3 btn btn-primary"
              >
                <span className="btn-icon-wrapper pr-2 opacity-7">
                  <i className="fa fa-plus fa-w-20" />
                </span>
                Create
              </Link>
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
                      <th>Category Name</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data).length !== 0 &&
                      data.map((data, index) => (
                        <tr key={index}>
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
                                      src={`https://drive.google.com/uc?export=view&id=${data.image}`}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  className="widget-content-left flex2"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <div className="widget-heading">
                                    {data.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <Link
                              to={`/admin/category/${data.id}`}
                              className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                            >
                              Update
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Main */}
    </div>
  );
}

export default AdminCategoryPage;
