import sponsoredImage from "../assets/images/sponsoredImage.png";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sponsored() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-5 pb-6 sm:px-6 md:px-8 lg:px-10">
      <div className="bg-white p-2 md:p-4 lg:p-5">
        <h2 className="mb-3 text-lg text-gray-900 md:mb-4 md:text-xl lg:text-2xl">
          Sponsored
        </h2>

        <img
          src={sponsoredImage}
          alt="Sponsored"
          className="h-full w-full object-cover md:h-44 lg:h-80"
        />

        {/* Offer */}
        <div className="mt-5 flex items-center justify-between md:mt-6">
          <p className="text-lg font-semibold md:text-xl lg:text-2xl">
            Up to 50% Off
          </p>

          <button
            onClick={() => navigate("/shop?deal=true")}
            className="flex items-center justify-center"
            aria-label="View discounted products"
          >
            <ChevronRight
              size={24}
              className="md:h-7 md:w-7 lg:h-8 lg:w-8"
            />
          </button>
        </div>
      </div>
    </section>
  );
}