import Cookies from "js-cookie";
import { makeRequest } from "~/services";
export const addToCart = (id, color, size, quantity) => {
  if (Cookies.get("userData")) {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      productId: id,
      color: color,
      size: size,
      quantity: quantity,
    };
    console.log(APIdata);
    const fetchData = async () => {
      try {
        const path = "authen/cart/add";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        localStorage.setItem("update", id);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
    return true;
  } else {
    return false;
  }
};
export const removeFromCart = (id) => {
  if (Cookies.get("userData")) {
    const userToken = Cookies.get("jwtToken");
    const axiosInstance = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };
    const APIdata = {
      integerArray: [id],
    };
    const fetchData = async () => {
      try {
        const path = "authen/cart/remove";
        const method = "POST";
        const result = await makeRequest(method, path, APIdata, axiosInstance);
        localStorage.setItem("update", "true");
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    return true;
  } else {
    return false;
  }
};
export const updateCart = () => {
  const fetchData = async () => {
    try {
      const path = "unauthen/shop/totalProductsQuantity";
      const method = "GET";
      const flag = Math.random();
      const result = await makeRequest(method, path);
      localStorage.setItem("update", flag);
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  fetchData();
};
