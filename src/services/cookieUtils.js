// cookieUtils.js

import Cookies from "js-cookie";

// Hàm để mã hóa giá trị và lưu vào cookie
export const encodeAndSetCookie = (cookieName, value) => {
  // Mã hóa giá trị thành Base64
  const encodedValue = btoa(value);
  const encodedName = btoa(cookieName);
  // Lưu vào cookie với thời gian sống
  Cookies.set(encodedName, encodedValue);
};

// Hàm để đọc giá trị từ cookie và giải mã
export const getDecodedCookie = (cookieName) => {
  const encodedName = btoa(cookieName);
  const encodedCookie = Cookies.get(encodedName);
  if (encodedCookie) {
    // Giải mã giá trị từ Base64
    const decodedValue = atob(encodedCookie);
    return decodedValue;
  }
  return null;
};
