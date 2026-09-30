import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import onboarding1 from "../assets/images/onboarding-1.png";
import onboarding2 from "../assets/images/onboarding-2.png";
import onboarding3 from "../assets/images/onboarding-3.png";

export default function Onboarding() {
  const navigate = useNavigate();

  const onboardingData = [
    {
      title: "Choose Products",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
      image: onboarding1,
    },
    {
      title: "Make Payment",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
      image: onboarding2,
    },
    {
      title: "Get Your Order",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
      image: onboarding3,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const current = onboardingData[currentPage];

  const finishOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/getstarted");
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      finishOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 py-6 sm:px-8 sm:py-8 md:px-10 lg:px-12">
      {/* Top Navigation */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between font-bold">
        <span className="text-sm md:text-base">
          {currentPage + 1}
          <span className="text-[#A8A8A9]">/3</span>
        </span>

        <button
          onClick={handleSkip}
          className="text-sm md:text-base"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center py-10 sm:py-12 md:py-14 lg:py-16">
        <img
          src={current.image}
          alt=""
          className="w-full max-w-sm object-contain sm:max-w-md md:max-w-lg lg:max-w-xl"
        />
      </div>

      {/* Text */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          {current.title}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 tracking-wider text-[#A8A8A9] sm:text-base sm:leading-7 md:text-lg md:leading-8">
          {current.description}
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="mx-auto mt-8 flex w-full max-w-5xl items-center justify-between pb-2 sm:mt-10 md:mt-12">
        <div className="w-20 sm:w-24">
          {currentPage > 0 && (
            <button
              onClick={handlePrev}
              className="text-sm font-semibold text-[#A8A8A9] sm:text-base"
            >
              Prev
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onboardingData.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full ${
                index === currentPage
                  ? "w-8 bg-black"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-24 text-right text-sm font-semibold text-[#F83758] sm:text-base"
        >
          {currentPage === 2 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}