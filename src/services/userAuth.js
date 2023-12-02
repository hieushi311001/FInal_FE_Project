// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { encodeAndSetCookie } from "./cookieUtils";
const useAuth = () => {
  useEffect(() => {
    // Check the cookie for the JWT token
    encodeAndSetCookie("isLogin", "LoginFalse"); // Cookie hết hạn sau 7 ngày
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      encodeAndSetCookie("isLogin", "LoginTrue");
    }
  }, []);
};

export default useAuth;
