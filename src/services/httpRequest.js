import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Thêm một phương thức chung để thực hiện mọi loại yêu cầu
export const makeRequest = async (method, path, data = null, options = {}) => {
  try {
    console.log("test");
    const response = await httpRequest.request({
      method,
      url: path,
      data,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error("Error making request:", error.message);
    throw error;
  }
};

export default httpRequest;
