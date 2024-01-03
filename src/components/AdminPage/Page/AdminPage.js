import "./AdminPage.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import images from "~/assets/images";
import Button from "~/";
function AdminPage() {
  const [seenNoti, setSeenNoti] = useState([]);
  const [unSeenNoti, setUnSeenNoti] = useState([]);
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = Cookies.get("jwtTokenAdmin");
    const fetchData = async () => {
      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(today.getDate()).padStart(2, "0");

      const currentDate = `${year}-${month}-${day}`;
      try {
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };
        const APIdata = {
          filter: {
            startDate: "2023-09-10",
            endDate: currentDate,
          },
          pagination: {
            page: 1,
            limit: count,
          },
        };
        const path = `authen/notification/filterNotifications`;
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        const formatData = result.content.map((data) => {
          const formattedDate = format(
            new Date(data.notificationDate),
            "HH:mm - dd/MMM/YYY"
          );

          return {
            ...data,
            notificationDate: formattedDate,
          };
        });

        const updatedNotifications = formatData.map((notification) => {
          const resultObject = convertStringToObject(
            notification.additionalData
          );

          if (resultObject) {
            notification.additionalData = resultObject;
          }
          return notification;
        });
        const readNotifications = updatedNotifications.filter(
          (notification) => notification.seen === true
        );
        const unreadNotifications = updatedNotifications.filter(
          (notification) => notification.seen === false
        );
        setUnSeenNoti(unreadNotifications);
        setSeenNoti(readNotifications);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [count]);
  function convertStringToObject(inputString) {
    // Loại bỏ dấu ngoặc nhọn và dấu cách ở hai đầu chuỗi
    const cleanedString = inputString.slice(1, -1).trim();

    // Chia chuỗi thành mảng các cặp key-value
    const keyValuePairs = cleanedString.split(", ");

    // Tạo đối tượng từ các cặp key-value
    const resultObject = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      resultObject[key] = value;
    });

    return resultObject;
  }
  const handleAction = (id, invoice) => {
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("jwtTokenAdmin");
        const axiosInstance = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        };

        const path = `authen/notification/seen_notification_id=${id}`;
        const method = "GET";
        await makeRequest(method, path, null, axiosInstance);
        navigate(
          `invoice/${invoice.invoiceId}-${invoice.paymentMethod}-${invoice.paymentStatus}`
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  };
  const handleMore = () => {
    setCount(count + 5);
  };
  const handleDirect = (invoice) => {
    navigate(
      `invoice/${invoice.invoiceId}-${invoice.paymentMethod}-${invoice.paymentStatus}`
    );
  };
  return (
    <div className="app-main container">
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div className="page-title-icon">
                <i className="fa fa fa-bell" />
              </div>
              <div>
                Notification
                <div className="page-title-subheading">
                  View, create, update, delete and manage.
                </div>
              </div>
            </div>
            <div className="page-title-actions">
              <button
                onClick={handleMore}
                className="btn-shadow btn-hover-shine mr-3 btn btn-primary"
              >
                More notification
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 right">
            <div className="box shadow-sm rounded bg-white mb-3">
              <div className="box-title border-bottom p-3">
                <h6 className="m-0">Unread</h6>
              </div>
              {Object.keys(unSeenNoti).length !== 0 &&
                unSeenNoti.map((data, index) => (
                  <div
                    className="box-body p-0"
                    onClick={() => handleDirect(data.additionalData)}
                  >
                    <div className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src={images.webLogo1}
                          alt=""
                        />
                      </div>
                      <div className="font-weight-bold mr-3">
                        <div className="text-truncate">{data.title}</div>
                        <div className="small">{data.content}</div>
                        <div className="small">
                          Invoice ID: {data.additionalData.invoiceId}
                        </div>
                      </div>

                      <span className="ml-auto mb-auto">
                        <div className="btn-group ">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm rounded"
                            onClick={() =>
                              handleAction(data.id, data.additionalData)
                            }
                            style={{ marginLeft: "150px" }}
                          >
                            <i className="fa fa-th-list" />
                          </button>
                        </div>

                        <br />
                        <div className="text-right text-muted pt-1">
                          {data.notificationDate}
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="box shadow-sm rounded bg-white mb-3">
              <div className="box-title border-bottom p-3">
                <h6 className="m-0">Read</h6>
              </div>
              {Object.keys(seenNoti).length !== 0 &&
                seenNoti.map((data, index) => (
                  <div
                    className="box-body p-0"
                    onClick={() => handleDirect(data.additionalData)}
                  >
                    <div className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src={images.webLogo1}
                          alt=""
                        />
                      </div>
                      <div className="font-weight-bold mr-3">
                        <div className="text-truncate">{data.title}</div>
                        <div className="small">{data.content}</div>
                        <div className="small">
                          Invoice ID: {data.additionalData.invoiceId}
                        </div>
                      </div>

                      <span className="ml-auto mb-auto">
                        <br />
                        <div className="text-right text-muted pt-1">
                          {data.notificationDate}
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
