import { useNavigate } from "react-router-dom";

export default function FlatHeelsBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-5 mt-6 h-47.5 overflow-hidden bg-white sm:mx-6 md:mx-8 md:h-56 lg:mx-10 lg:h-64">
      <div className="absolute bottom-3 left-0 right-0 top-3 mr-1.5 bg-[#f9f9f9] md:bottom-4 md:top-4">
        {/* Yellow dots */}
        <img
          src="/flatheel-1.png"
          alt=""
          className="absolute -left-6 top-0 z-0 h-full w-[38%] object-contain md:-left-8 lg:-left-38"
        />

        {/* Heel */}
        <img
          src="/flatheel-2.png"
          alt="Flat and heels"
          className="absolute left-[7%] top-3 z-10 h-37 w-[40%] object-contain md:top-4 md:h-44 lg:top-5 lg:h-52 lg:-left-10"
        />

        {/* Text */}
        <div className="absolute right-[5%] top-1/2 z-20 flex w-[50%] -translate-y-1/2 flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
            Flat and Heels
          </h2>

          <p className="mt-1 text-xs text-gray-700 md:text-sm lg:text-base">
            Stand a chance to get rewarded
          </p>

          <button
            onClick={() =>
              navigate("/shop?category=womens-shoes")
            }
            className="mt-4 flex w-fit items-center gap-2 rounded-md bg-[#F83758] px-4 py-2 text-xs font-medium text-white md:px-5 md:py-2.5 md:text-sm lg:mt-5 lg:px-6 lg:py-3"
          >
            Visit Now
            <img
              src="/arrow.png"
              alt=""
              className="h-3 w-auto md:h-3.5"
            />
          </button>
        </div>
      </div>

      <img
        src="/flatheel-3.png"
        alt="Flat and heels"
        className="absolute left-0 top-0 z-30 h-full w-4 object-cover md:w-5 lg:w-6"
      />
    </section>
  );
}