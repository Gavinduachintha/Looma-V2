import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkGoogleTokenValid } from "../utils/checkGoogleTokenValid";
import axios from "axios";

/**
 * Custom hook for Google OAuth authentication
 * Handles OAuth callback, token validation, and connection flow
 */
export const useGoogleAuth = () => {
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Handle OAuth callback
  useEffect(() => {
    const authStatus = searchParams.get("auth");
    const errorMessage = searchParams.get("message");
    const token = searchParams.get("token");
    const userDataString = searchParams.get("user");
    const isNewUser = searchParams.get("new_user") === "true";

    if (authStatus === "success") {
      if (token && userDataString) {
        // Handle Google OAuth user authentication
        try {
          const userData = JSON.parse(decodeURIComponent(userDataString));

          // Store authentication data
          localStorage.setItem("authToken", decodeURIComponent(token));
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem(
            "googleTokenExpired",
            userData.googleTokenExpired || false
          );

          if (isNewUser) {
            toast.success(
              "Welcome to Looma! Your account has been created successfully."
            );
          } else {
            toast.success("Welcome back! You've been signed in with Google.");
          }

          setIsGoogleAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          toast.error(
            "Authentication data error. Please try signing in again."
          );
        }
      } else {
        // Handle Gmail/Calendar authentication only
        setIsGoogleAuthenticated(true);
      }

      // Clear the URL parameters
      navigate("/dashboard", { replace: true });
    } else if (authStatus === "error") {
      toast.error(
        `Google authentication failed: ${errorMessage || "Unknown error"}`
      );
      navigate("/dashboard", { replace: true });
    } else if (authStatus === "already") {
      toast.info("Already authenticated with Google");
      setIsGoogleAuthenticated(true);
      navigate("/dashboard", { replace: true });
    }
  }, [searchParams, navigate]);

  // Check Google authentication status on mount
  useEffect(() => {
    checkGoogleAuthenticationStatus();
  }, []);

  const checkGoogleAuthenticationStatus = async () => {
    try {
      const isValid = await checkGoogleTokenValid();
      setIsGoogleAuthenticated(isValid);
    } catch (error) {
      console.error("Error checking Google authentication:", error);
      setIsGoogleAuthenticated(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsRefreshing(true);
      // Re-check validity before forcing auth
      const stillValid = await checkGoogleTokenValid();
      if (stillValid) {
        toast.success("Google already connected");
        setIsGoogleAuthenticated(true);
        return;
      }
      // Kick off backend-driven OAuth flow
      window.location.href = "http://localhost:3000/auth";
    } catch (error) {
      toast.error("Failed to start Google auth");
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    if (!isGoogleAuthenticated) return [];

    try {
      const res = await axios.get("http://localhost:3000/upcomingEvents", {
        withCredentials: true,
      });
      return res.data.events || [];
    } catch (e) {
      if (e?.response?.status === 401) {
        console.info(
          "Skipped upcoming events: Google not authenticated (401)."
        );
      } else {
        console.warn("Failed to load upcoming events", e?.message || e);
      }
      return [];
    }
  };

  return {
    isGoogleAuthenticated,
    isRefreshing,
    handleGoogleAuth,
    fetchUpcomingEvents,
    checkGoogleAuthenticationStatus,
  };
};
