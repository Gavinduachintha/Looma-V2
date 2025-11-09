import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Custom hook for landing page navigation
 * Manages navigation to different pages and dashboard access
 */
export const useLandingNavigation = () => {
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate("/signin");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const gotoDashboard = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login first");
      navigate("/signin");
      return;
    }
    navigate("/dashboard");
  };

  return {
    goToSignin,
    goToSignup,
    gotoDashboard,
  };
};
