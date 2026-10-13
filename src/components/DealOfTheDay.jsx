import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "../api/products";
import { useNavigate } from "react-router-dom";

export default function DealOfTheDay() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();

  // Load deal products
  useEffect(() => {
    getProducts()
      .then((data) => {
        const deals = data
          .filter((product) => product.discountValue >= 10)
          .slice(0, 6);

        setProducts(deals);
      })
      .catch((error) => {
        console.error("Failed to load deals:", error);
      });
  }, []);

  // Countdown to midnight in the user's local time
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      const difference = Math.max(
        0,
        midnight.getTime() - now.getTime()
      );

      const totalSeconds = Math.floor(
        difference / 1000
      );

      setTimeLeft({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) =>
    String(value).padStart(2, "0");

  const maxIndex = Math.max(products.length - 2, 0);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, maxIndex)
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl">
      {/* Header */}
      <div className="mx-5 rounded-lg bg-blue-500 px-4 py-3 text-white sm:mx-6 md:mx-8 md:px-6 md:py-4 lg:mx-10 lg:px-8 lg:py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold md:text-lg lg:text-xl">
              Deal of the Day
            </h2>

            <span className="text-xs md:text-sm">
              ⏱ {formatTime(timeLeft.hours)}h{" "}
              {formatTime(timeLeft.minutes)}m{" "}
              {formatTime(timeLeft.seconds)}s remaining
            </span>
          </div>

          <button
            onClick={() => navigate("/shop?deal=true")}
            className="mt-2 flex items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium md:px-5 md:py-2.5 md:text-sm"
          >
            View all

            <img
              src="/arrow.png"
              alt=""
              className="h-3 w-auto md:h-3.5"
            />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="relative mt-4 px-5 sm:px-6 md:px-8 lg:px-10">
        {products.length > 0 ? (
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out md:gap-5 lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[calc(50%-8px)] shrink-0 md:w-[calc(33.333%-13.333px)] lg:w-[calc(25%-18px)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading deals...
          </div>
        )}

        {/* Previous Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4C4C4] shadow-lg md:left-4 md:h-11 md:w-11 lg:left-6 lg:h-12 lg:w-12"
            aria-label="Previous deals"
          >
            <ChevronLeft />
          </button>
        )}

        {/* Next Arrow */}
        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4C4C4] shadow-lg md:right-4 md:h-11 md:w-11 lg:right-6 lg:h-12 lg:w-12"
            aria-label="Next deals"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}