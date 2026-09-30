import { ArrowDownUp, Funnel } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Beauty",
      image: "/beauty.png",
      category: "beauty",
    },
    {
      name: "Fashion",
      image: "/fashion.png",
      category: "fashion",
    },
    {
      name: "Kids",
      image: "/kids.png",
      category: "null",
    },
    {
      name: "Mens",
      image: "/mens.png",
      category: "mens",
    },
    {
      name: "Womens",
      image: "/womens.png",
      category: "womens",
    },
  ];

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl">
      {/* Heading */}
      <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 lg:px-10">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          All Featured
        </h2>

        <div className="flex items-center gap-4 md:gap-5">
          <button className="flex items-center gap-1 rounded-md bg-white px-4 py-1 text-sm text-gray-600 shadow-[0_0_50px_rgba(0,0,0,0.1)] md:px-5 md:py-2">
            Sort
            <span>
              <ArrowDownUp
                size={15}
                className="md:h-4 md:w-4"
              />
            </span>
          </button>

          <button className="flex items-center gap-1 rounded-md bg-white px-4 py-1 text-sm text-gray-600 shadow-[0_0_50px_rgba(0,0,0,0.1)] md:px-5 md:py-2">
            Filter
            <Funnel
              size={15}
              className="md:h-4 md:w-4"
            />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-4 mt-4 flex justify-between rounded-lg p-2 shadow-[0_0_50px_rgba(0,0,0,0.1)] sm:mx-6 sm:px-4 md:mx-8 md:px-6 lg:mx-10 lg:px-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => {
              if (category.category) {
                navigate(
                  `/shop?category=${category.category}`
                );
              }
            }}
            className="flex min-w-14.5 flex-col items-center md:min-w-20 lg:min-w-24"
          >
            <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-100 md:h-16 md:w-16 lg:h-18 lg:w-18">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>

            <span className="mt-2 text-xs text-gray-700 md:text-sm">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}