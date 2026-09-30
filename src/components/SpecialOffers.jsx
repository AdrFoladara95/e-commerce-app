import { useNavigate } from "react-router-dom";

export default function SpecialOffers() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
      <button
        onClick={() => navigate("/shop?deal=true")}
        className="flex w-full items-center gap-4 rounded-lg bg-white text-left shadow-[0_0_50px_rgba(0,0,0,0.1)] md:gap-6 lg:gap-8"
      >
        {/* Image */}
        <div className="h-20 w-20 shrink-0 md:h-24 md:w-24 lg:h-28 lg:w-28">
          <img
            src="/specialoffer.png"
            alt="Special offers"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="py-3 pr-4 md:py-4 md:pr-6 lg:py-5 lg:pr-8">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl">
            Special Offers{" "}
            <span className="rounded-full border border-gray-500 p-1 text-sm md:text-base">
              😱
            </span>
          </h2>

          <p className="mt-1 text-xs leading-5 text-gray-500 md:text-sm md:leading-6 lg:text-base">
            We make sure you get the offer you need at best prices.
          </p>
        </div>
      </button>
    </section>
  );
}