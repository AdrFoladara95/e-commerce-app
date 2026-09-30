import banner from "../../public/Promo-banner.png";
import { useNavigate } from "react-router-dom";

export default function PromoBanner() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-5 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
      <div
        className="relative h-45 overflow-hidden rounded-lg bg-cover bg-center text-white sm:h-48 md:h-56 lg:h-64"
        style={{ backgroundImage: `url(${banner})` }}
      >
        {/* Text */}
        <div className="relative z-10 flex h-full w-[55%] flex-col justify-center pl-5 sm:pl-6 md:w-[50%] md:pl-8 lg:w-[45%] lg:pl-10">
          <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
            50-40% OFF
          </p>

          <p className="mt-1 text-sm md:text-base lg:text-lg">
            Selected products
          </p>

          <p className="mt-1 text-xs md:text-sm lg:text-base">
            All colours
          </p>

          <button
            onClick={() => navigate("/shop?deal=true")}
            className="mt-4 flex w-fit items-center gap-2 rounded-md border px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm"
          >
            Shop Now
            <img
              src="/arrow.png"
              alt=""
              className="h-3 w-auto md:h-3.5"
            />
          </button>
        </div>
      </div>

      {/* Slider dots */}
      <div className="mt-3 flex justify-center gap-1.5 md:mt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF92A5] md:h-2 md:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-300 md:h-2 md:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-300 md:h-2 md:w-2" />
      </div>
    </section>
  );
}