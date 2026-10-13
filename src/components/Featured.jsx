import { useState } from "react";
import { ArrowDownUp, Funnel, Check } from "lucide-react";
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
      category: "kids",
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

  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.name)
  );
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const sortedCategories = [...categories]
    .filter((category) =>
      selectedCategories.includes(category.name)
    )
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === "za") {
        return b.name.localeCompare(a.name);
      }

      return (
        categories.findIndex((item) => item.name === a.name) -
        categories.findIndex((item) => item.name === b.name)
      );
    });

  const toggleCategory = (name) => {
    setSelectedCategories((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const resetFilters = () => {
    setSelectedCategories(
      categories.map((category) => category.name)
    );
  };

  return (
    <section className="relative mx-auto mt-6 w-full max-w-7xl">
      <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 lg:px-10">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          All Featured
        </h2>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              aria-expanded={showSort}
              className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm text-gray-600 shadow-[0_0_50px_rgba(0,0,0,0.1)] md:px-5"
            >
              Sort
              <ArrowDownUp size={15} />
            </button>

            {showSort && (
              <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                  Sort categories
                </p>

                {[
                  { label: "Default order", value: "default" },
                  { label: "Name: A–Z", value: "az" },
                  { label: "Name: Z–A", value: "za" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortOrder(option.value);
                      setShowSort(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {option.label}
                    {sortOrder === option.value && (
                      <Check size={16} className="text-[#F83758]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              aria-expanded={showFilter}
              className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm text-gray-600 shadow-[0_0_50px_rgba(0,0,0,0.1)] md:px-5"
            >
              Filter
              <Funnel size={15} />
              {selectedCategories.length < categories.length && (
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F83758] px-1 text-xs text-white">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {showFilter && (
              <div className="absolute right-0 z-30 mt-2 w-52 rounded-lg border border-gray-100 bg-white p-3 shadow-lg">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    Categories
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-medium text-[#F83758]"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category.name}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category.name
                        )}
                        onChange={() =>
                          toggleCategory(category.name)
                        }
                        className="h-4 w-4 accent-[#F83758]"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowFilter(false)}
                  className="mt-3 w-full rounded-md bg-[#F83758] py-2 text-sm font-medium text-white"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 flex justify-between gap-3 overflow-x-auto rounded-lg p-3 shadow-[0_0_50px_rgba(0,0,0,0.1)] sm:mx-6 sm:px-4 md:mx-8 md:px-6 lg:mx-10 lg:px-8">
        {sortedCategories.length > 0 ? (
          sortedCategories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                navigate(`/shop?category=${category.category}`)
              }
              className="flex min-w-14.5 shrink-0 flex-col items-center md:min-w-20 lg:min-w-24"
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
          ))
        ) : (
          <div className="w-full py-4 text-center">
            <p className="text-sm text-gray-500">
              No categories selected.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 text-sm font-medium text-[#F83758]"
            >
              Show all categories
            </button>
          </div>
        )}
      </div>
    </section>
  );
}