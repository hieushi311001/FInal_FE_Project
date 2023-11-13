// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check the cookie for the JWT token
    const jwtToken = Cookies.get("jwtToken");

    if (!jwtToken) {
      setIsAuthenticated(false);
    }
  }, []);
  return { isAuthenticated };
};

export default useAuth;
