import Cookies from "js-cookie";
import { makeRequest } from "~/services";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Notification.css";
function Notification({ updateNotifiValue }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      filter: {
        startDate: "2023-09-10",
        endDate: "2023-12-26",
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
        setNotifications(formatData);
        updateNotifiValue(itemCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    // const checkLocalStorage = () => {
    //   const currentLocalStorageState = localStorage.getItem("update");

    //   if (currentLocalStorageState !== prevLocalStorageState) {
    //     // If there's a change, reload the page
    //     setPrevLocalStorageState(currentLocalStorageState);
    //   }
    // };
    // const intervalId = setInterval(checkLocalStorage, 1000);

    // // Cleanup the interval on component unmount
    // return () => clearInterval(intervalId);
    //   }, [prevLocalStorageState, updateCartValue]);
  }, [updateNotifiValue]);

  return (
    <div className="cart-hover">
      <div className="select-items">
        <table>
          <tbody>
            <div className="notification-list">
              {Object.keys(notifications).length !== 0 &&
                notifications.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="si-text">
                        <div className="product-selected">
                          <h5
                            style={{
                              color: data.seen ? "" : "#e7ab3c",
                            }}
                          >
                            {data.title} - <span>{data.notificationDate}</span>
                          </h5>

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
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notification;
