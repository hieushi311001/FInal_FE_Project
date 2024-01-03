import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
function Notification({ updateNotifiValue }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [getId, setGetId] = useState([]);
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;
    const APIdata = {
      filter: {
        startDate: "2023-09-10",
        endDate: currentDate,
      },
      pagination: {
        page: 1,
        limit: 5,
      },
    };
    const fetchData = async () => {
      try {
        const path = "authen/notification/filterNotifications";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        console.log(result);
        const itemCount = result.content.length;
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

        console.log(updatedNotifications);
        setNotifications(formatData);
        updateNotifiValue(itemCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [updateNotifiValue]);
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
  const handleClick = (id, invoice) => {
    console.log(invoice.invoiceId);
    const fetchData = async () => {
      const userToken = Cookies.get("jwtToken");
      const axiosInstance = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const path = `authen/notification/seen_notification_id=${id}`;
        const method = "GET";
        const result = await makeRequest(method, path, null, axiosInstance);
        console.log(result);
        navigate(
          `/invoice/${invoice.invoiceId}-${invoice.paymentMethod}-${invoice.paymentStatus}`
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };
  return (
    <div className="cart-hover">
      <div className="select-items">
        <table>
          <tbody>
            {Object.keys(notifications).length !== 0 &&
              notifications.map((data, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => handleClick(data.id, data.additionalData)}>
                    <td className="si-text">
                      <div className="product-selected">
                        <h5
                          style={{
                            color: data.seen ? "" : "#e7ab3c",
                          }}
                        >
                          {data.title}
                        </h5>
                        <span style={{ fontSize: "14px" }}>
                          Invoice ID: {data.additionalData.invoiceId} |
                        </span>
                        <span style={{ fontSize: "14px" }}>
                          {" "}
                          {data.notificationDate}
                        </span>
                        <h6>{data.content}</h6>
                      </div>
                    </td>
                  </tr>
                  {index !== notifications.length - 1 && (
                    <tr>
                      <td>
                        <hr />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notification;
