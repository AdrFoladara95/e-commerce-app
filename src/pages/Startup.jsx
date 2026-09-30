import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export default function Startup() {
  const navigate = useNavigate();

  useEffect(() => {
    // The user must log in again whenever a new app session starts.
    localStorage.removeItem("user");

    const timer = setTimeout(() => {
      const hasSeenOnboarding =
        localStorage.getItem("hasSeenOnboarding");

      if (hasSeenOnboarding === "true") {
        navigate("/login", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <img
        src={logo}
        alt="logo"
        className="w-56 max-w-full animate-pulse sm:w-64 md:w-72 lg:w-80"
      />

      <div className="mt-6 h-1.5 w-1.5 animate-bounce rounded-full bg-[#F83758]" />
    </div>
  );
}