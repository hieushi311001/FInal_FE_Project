import { parseISO } from "date-fns"; // Import parseISO function
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { format } from "date-fns";
import { PaginationControl } from "react-bootstrap-pagination-control";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminInvoicePage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
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
    { value: "SUCCESS", label: "Success" },
  ];
  const options4 = [
    { value: "", label: "Payment Method" },
    { value: "MOMO", label: "MOMO" },
    { value: "BANK_TRANSFER", label: "BANK_TRANSFER" },
    { value: "COD", label: "COD" },
  ];
  const today = new Date();

  // Lấy giá trị ngày, tháng và năm
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho tháng
  const day = today.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho ngày
  const formattedDate = `${year}-${month}-${day}`;
  const defaultDate = parseISO("2023-01-01");
  const [startInvoiceDate, setStartInvoiceDate] = useState("2023-01-01");
  const [endInvoiceDate, setEndInvoiceDate] = useState(formattedDate);
  const [selectedDate1, setSelectedDate1] = useState(defaultDate);
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const [selectedOption3, setSelectedOption3] = useState(options3[0]);
  const [selectedOption4, setSelectedOption4] = useState(options4[0]);

  useEffect(() => {
    const userToken = Cookies.get("jwtTokenAdmin");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      filter: {
        adminAcceptance: selectedOption1.value,
        paymentStatus: selectedOption2.value,
        orderStatus: selectedOption3.value,
        startInvoiceDate: startInvoiceDate,
        endInvoiceDate: endInvoiceDate,
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
        const path = `authen/invoice/filterOrders`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        const filterData = result.content.map((data) => {
          const formattedDate = format(
            new Date(data.invoiceDate),
            "dd/MMM/YYY"
          );

          return {
            ...data,
            invoiceDate: formattedDate,
          };
        });
        setData(filterData);
        // setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [
    page,
    selectedOption1,
    selectedOption2,
    selectedOption3,
    selectedOption4,
    endInvoiceDate,
    startInvoiceDate,
  ]);
  const handleDateChange1 = (date) => {
    const originalDate = new Date(date);
    const formattedDate = format(originalDate, "yyyy-MM-dd");
    console.log(formattedDate);
    setStartInvoiceDate(formattedDate);
    setSelectedDate1(date);
  };
  const handleDateChange2 = (date) => {
    const originalDate = new Date(date);
    const formattedDate = format(originalDate, "yyyy-MM-dd");
    console.log(formattedDate);
    setEndInvoiceDate(formattedDate);
    setSelectedDate2(date);
  };
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
  const handleClick = () => {
    navigate(0);
  };
  return (
    <div className="app-main">
      <div className="app-main__inner">
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
                <div style={{ marginLeft: "125px" }}>
                  <DatePicker
                    selected={selectedDate1}
                    onChange={handleDateChange1}
                    dateFormat="yyyy-MM-dd" // Customize date format as needed
                    placeholderText="Start Invoice Date"
                    className="datepicker"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
                <div style={{ marginLeft: "48px" }}>
                  <DatePicker
                    selected={selectedDate2}
                    onChange={handleDateChange2}
                    dateFormat="yyyy-MM-dd" // Customize date format as needed
                    placeholderText="End Invoice Date"
                    className="datepicker"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  marginLeft: "20px",
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
                <button onClick={handleClick} className="btn btn-primary">
                  Return default
                </button>
              </div>
              <div className="table-responsive-1">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">ID</th>
                      <th>Date</th>
                      <th>Payment Method</th>
                      <th>Payment Status</th>
                      <th className="text-center">Admin Acceptance</th>
                      <th className="text-center">Order Status</th>
                      <th className="text-center">Total Price</th>
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

                          <td style={{ verticalAlign: "middle" }}>
                            {data.invoiceDate}
                          </td>

                          <td style={{ verticalAlign: "middle" }}>
                            {data.paymentMethod}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {data.paymentStatus}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {data.adminAcceptance}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {data.orderStatus}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {data.totalPrice}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <Link
                              to={`/admin/invoice/${data.id}-${data.paymentMethod}-${data.orderStatus}`}
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

export default AdminInvoicePage;
