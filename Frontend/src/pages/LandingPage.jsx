import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LandingHeader,
  LandingBackground,
  HeroSection,
  FeaturesSection,
  CTASection,
  LandingFooter,
} from "../components/landing";
import {
  useReducedMotion,
  useLandingNavigation,
  useLandingFeatures,
} from "../hooks";

/**
 * Landing Page Component
 * Main landing page that introduces the application to users
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const { isDarkMode, toggleDarkMode, scrollToSection } =
    useLandingNavigation();
  const features = useLandingFeatures();

  // Button handlers
  const handleSignup = () => navigate("/signup");
  const handleSignin = () => navigate("/signin");
  const handleDashboard = () => navigate("/dashboard");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Background Effects */}
      {/* <LandingBackground
        isDarkMode={isDarkMode}
        reducedMotion={reducedMotion}
      /> */}

      {/* Header */}
      <LandingHeader
        isDarkMode={isDarkMode}
        toggleTheme={toggleDarkMode}
        onDashboardClick={handleDashboard}
        onSigninClick={handleSignin}
        onSignupClick={handleSignup}
      />

      {/* Hero Section */}
      <HeroSection
        isDarkMode={isDarkMode}
        reducedMotion={reducedMotion}
        onSignupClick={handleSignup}
      />

      {/* Features Section */}
      <FeaturesSection isDarkMode={isDarkMode} features={features} />

      {/* CTA Section */}
      <CTASection isDarkMode={isDarkMode} onSignupClick={handleSignup} />

      {/* Footer */}
      <LandingFooter isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
