import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/getstarted.jpg";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/80 via-black/65 to-transparent sm:h-[60%] md:h-[65%]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-8 sm:px-10 sm:pb-12 md:px-14 md:pb-14 lg:px-20 lg:pb-16">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="px-2 text-center text-3xl font-medium leading-tight text-white sm:px-6 sm:text-4xl md:text-5xl lg:text-6xl">
            You want Authentic, here you go
          </h1>

          <p className="mt-3 text-center text-sm leading-6 text-white sm:mt-4 sm:text-base md:text-lg">
            Find it here, buy it now!
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-8 h-14 w-full rounded-lg bg-[#F83758] text-base font-semibold text-white transition-colors hover:bg-[#e72f4f] active:scale-[0.99] sm:mt-10 sm:h-15 sm:text-lg md:mt-12"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}