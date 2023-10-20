import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Thêm một phương thức chung để thực hiện mọi loại yêu cầu
export const makeRequest = async (method, path, data = null, options = {}) => {
  try {
    const response = await httpRequest.request({
      method,
      url: path,
      data,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export default httpRequest;
