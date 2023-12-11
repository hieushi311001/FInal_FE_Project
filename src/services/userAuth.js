// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { encodeAndSetCookie } from "./cookieUtils";
const useAuth = () => {
  useEffect(() => {
    // Check the cookie for the JWT token
    const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    encodeAndSetCookie("isLogin", "LoginFalse", expirationDate); // Cookie hết hạn sau 7 ngày
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      encodeAndSetCookie("isLogin", "LoginTrue", expirationDate);
    }
  }, []);
};

export default useAuth;
