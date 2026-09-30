import { useNavigate } from "react-router-dom";
import hotSummerSale from "../assets/images/hot-summer-sales.png";

export default function NewArrivals() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
      <div className="overflow-hidden rounded-lg bg-white">
        {/* Hot Summer Sale */}
        <img
          src={hotSummerSale}
          alt="Hot Summer Sale"
          className="h-45 w-full object-cover md:h-56 lg:h-64"
        />

        {/* New Arrivals */}
        <div className="mt-4 flex items-center justify-between px-3 pb-3 md:px-5 md:pb-5 lg:px-6 lg:pb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
              New Arrivals
            </h2>

            <p className="mt-1 text-sm text-gray-700 md:text-base lg:text-lg">
              Summer' 25 Collections
            </p>
          </div>

          <button
            onClick={() => navigate("/shop?new=true")}
            className="flex items-center gap-2 rounded-md bg-[#F83758] px-4 py-2 text-xs font-medium text-white md:px-5 md:py-2.5 md:text-sm"
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
    </section>
  );
}