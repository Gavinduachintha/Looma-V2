import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for handling authentication
 * Manages auth token and redirects to signin if not authenticated
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const getAuthToken = () => localStorage.getItem("authToken");

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    localStorage.removeItem("googleTokenExpired");
    navigate("/signin");
  };

  return {
    isAuthenticated,
    getAuthToken,
    logout,
  };
};
