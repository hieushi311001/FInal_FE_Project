import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { format } from "date-fns";
import "./InvoicePage.css";
import { Link } from "react-router-dom";
function InvoicePage() {
  const [data, setData] = useState({});
  const userToken = Cookies.get("jwtToken");
  useEffect(() => {
    const APIdata = {
      filter: {
        adminAcceptance: "",
        paymentStatus: "",
        deliveryStatus: "",
        startInvoiceDate: "",
        endInvoiceDate: "",
        paymentMethod: "",
      },
      pagination: {
        page: 1,
        limit: 5,
      },
    };
    const fetchData = async () => {
      try {
        const method = "POST";
        if (userToken) {
          const axiosInstance = {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          };
          const path = "authen/invoice/filterOrders";
          const result = await makeRequest(
            method,
            path,
            APIdata,
            axiosInstance
          );
          console.log(result);
          const filterData = result.content.map((data) => {
            const formattedDate = format(
              new Date(data.invoiceDate),
              "HH:mm - dd/MMM/YYY"
            );

            return {
              ...data,
              invoiceDate: formattedDate,
            };
          });
          setData(filterData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userToken]);
  return (
    <div className="container">
      <div className="table-responsive">
        <table className="mx-auto align-middle mb-0 table table-borderless table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Price / Invoice Date</th>
              <th>Admin Acceptance</th>
              <th>Delivery Status</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).length &&
              data.map((data) => (
                <tr>
                  <td className="text-muted">{data.id}</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          {/* <div className="widget-content-left">
                        <img
                          style={{ height: 60 }}
                          data-toggle="tooltip"
                          title="Image"
                          data-placement="bottom"
                          src="assets/images/_default-product.jpg"
                          alt=""
                        />
                      </div> */}
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">
                            ${data.totalPrice}
                          </div>
                          <div className="widget-subheading">
                            {data.invoiceDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{data.adminAcceptance}</td>
                  <td>{data.deliveryStatus}</td>
                  <td>
                    <div className="badge badge-dark">{data.paymentStatus}</div>
                  </td>
                  <td>
                    <div className="badge badge-dark">{data.paymentMethod}</div>
                  </td>
                  <td>
                    <Link
                      to={`/invoice/${data.id}`}
                      className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/invoice/${data.id}`}
                      className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/invoice/${data.id}`}
                      className="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                    >
                      Cancel
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoicePage;
