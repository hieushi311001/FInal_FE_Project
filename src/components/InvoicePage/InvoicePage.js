import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { format } from "date-fns";
import "./InvoicePage.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { PaginationControl } from "react-bootstrap-pagination-control";
function InvoicePage() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const userToken = Cookies.get("jwtToken");
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho tháng
  const day = today.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho ngày
  const formattedDate = `${year}-${month}-${day}`;
  const options1 = [
    { value: "", label: "Admin Acceptance" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "WAITING", label: "Waiting" },
    { value: "REFUSED", label: "Refused" },
    { value: "ACCEPTANCE_WAITING", label: "Acceptance Waiting" },
    { value: "PAYMENT_WAITING", label: "Payment Waiting" },
    { value: "CONFIRMED_ONLINE_PAYMENT", label: "Confirmed Online Payment" },
  ];
  const options2 = [
    { value: "", label: "Payment Status" },
    { value: "PAID", label: "Paid" },
    { value: "UNPAID", label: "Unpaid" },
  ];
  const options3 = [
    { value: "", label: "Order Status" },
    { value: "ACCEPTANCE_WAITING", label: "Acceptance Waiting" },
    { value: "PACKING", label: "Packing" },
    { value: "FINISH_PACKING", label: "Finish Packing" },
    { value: "PAYMENT_WAITING", label: "Payment Waiting" },
    { value: "SHIPPER_CANCEL", label: "Shipper Cancel" },
    { value: "NOT_SHIPPED", label: "Not Shipped" },
    { value: "CUSTOMER_CANCEL", label: "Customer Cancel" },
    { value: "SHIPPING", label: "Shipping" },
    { value: "FAILED", label: "Failed" },
  ];
  const options4 = [
    { value: "", label: "Payment Method" },
    { value: "MOMO", label: "MOMO" },
    { value: "BANK_TRANSFER", label: "BANK_TRANSFER" },
    { value: "COD", label: "COD" },
  ];
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const [selectedOption3, setSelectedOption3] = useState(options3[0]);
  const [selectedOption4, setSelectedOption4] = useState(options4[0]);
  const [dataLength, setDataLength] = useState(0);
  useEffect(() => {
    const APIdata = {
      filter: {
        adminAcceptance: selectedOption1.value,
        paymentStatus: selectedOption2.value,
        orderStatus: selectedOption3.value,
        startInvoiceDate: "2023-01-01",
        endInvoiceDate: formattedDate.value,
        paymentMethod: selectedOption4.value,
      },
      pagination: {
        page: page,
        limit: 5,
      },
    };
    console.log(APIdata);
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

          const dataCount = Object.keys(result.content).length;

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
          setDataLength(dataCount);
          setData(filterData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    userToken,
    formattedDate,
    page,
    selectedOption1,
    selectedOption2,
    selectedOption3,
    selectedOption4,
    dataLength,
  ]);
  const handleOptionChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
    setPage(1);
  };
  const handleOptionChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    setPage(1);
  };
  const handleOptionChange3 = (selectedOption) => {
    setSelectedOption3(selectedOption);
    setPage(1);
  };
  const handleOptionChange4 = (selectedOption) => {
    setSelectedOption4(selectedOption);
    setPage(1);
  };
  return (
    <div className="container">
      <div className="table-responsive">
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            marginLeft: "10px",
            alignItems: "center",
          }}
        >
          <Select
            className="sorting"
            options={options1}
            value={selectedOption1}
            onChange={handleOptionChange1}
            styles={{
              control: (provided, state) => ({
                ...provided,
                fontWeight: "bold",
                width: "200px",
                marginRight: "20px",
              }),
            }}
          ></Select>
          <Select
            className="sorting"
            options={options2}
            value={selectedOption2}
            onChange={handleOptionChange2}
            styles={{
              control: (provided, state) => ({
                ...provided,
                fontWeight: "bold",
                width: "200px",
                marginRight: "20px",
              }),
            }}
          ></Select>
          <Select
            className="sorting"
            options={options3}
            value={selectedOption3}
            onChange={handleOptionChange3}
            styles={{
              control: (provided, state) => ({
                ...provided,
                fontWeight: "bold",
                width: "200px",
                marginRight: "20px",
              }),
            }}
          ></Select>
          <Select
            className="sorting"
            options={options4}
            value={selectedOption4}
            onChange={handleOptionChange4}
            styles={{
              control: (provided, state) => ({
                ...provided,
                fontWeight: "bold",
                width: "200px",
                marginRight: "20px",
              }),
            }}
          ></Select>
          {/* <button onClick={handleClick}>Return default</button> */}
        </div>
        <table className="mx-auto align-middle mb-0 table table-borderless table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Price / Invoice Date</th>
              <th>Admin Acceptance</th>
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
        <div style={{ marginTop: "10px" }}>
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
  );
}

export default InvoicePage;
