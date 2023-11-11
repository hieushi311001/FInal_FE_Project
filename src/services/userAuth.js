// useAuth.js
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the cookie for the JWT token
    const jwtToken = Cookies.get("jwtToken");

    if (jwtToken) {
      setIsAuthenticated(isAuthenticated);
    } else {
      setIsAuthenticated(!isAuthenticated);
    }
  }, [isAuthenticated]);
  return { isAuthenticated };
};

export default useAuth;
