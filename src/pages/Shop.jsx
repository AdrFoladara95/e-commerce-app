import React, { useState, useEffect } from "react";
import { ArrowDownUp, Funnel, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";
import { getProducts } from "../api/products";

export default function Shop() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const deal = searchParams.get("deal");
  const newArrivals = searchParams.get("new");

  const categoryMap = {
    beauty: [
      "beauty",
      "skin-care",
      "fragrances",
      "sunglasses",
    ],
    fashion: [
      "tops",
      "mens-shirts",
      "mens-shoes",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
    ],
    kids: [],
    mens: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
    ],
    womens: [
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
    "womens-shoes": [
      "womens-shoes",
    ],
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [sortOption, setSortOption] = useState("recommended");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [priceFilter, setPriceFilter] = useState("all");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Search + Category + Deal + New Arrivals
  const searchedProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !category ||
      categoryMap[category]?.includes(product.category);

    const matchesDeal =
      !deal || product.discountValue >= 10;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDeal
    );
  });

  // New Arrivals
  const newArrivalProducts = newArrivals
    ? [...searchedProducts]
        .sort((a, b) => b.id - a.id)
        .slice(0, 15)
    : searchedProducts;

  // Filters
  const filteredProducts = newArrivalProducts.filter(
    (product) => {
      const price = product.priceValue;
      const discount = product.discountValue;
      const rating = product.ratingValue;

      if (
        priceFilter === "under500" &&
        price >= 500
      ) {
        return false;
      }

      if (
        priceFilter === "500-1000" &&
        (price < 500 || price > 1000)
      ) {
        return false;
      }

      if (
        priceFilter === "1000-5000" &&
        (price < 1000 || price > 5000)
      ) {
        return false;
      }

      if (
        priceFilter === "above5000" &&
        price <= 5000
      ) {
        return false;
      }

      if (discountFilter !== "all") {
        const minimumDiscount = Number(discountFilter);

        if (discount < minimumDiscount) {
          return false;
        }
      }

      if (reviewFilter !== "all") {
        const minimumRating = Number(reviewFilter);

        if (rating < minimumRating) {
          return false;
        }
      }

      return true;
    }
  );

  // Sort
  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      const priceA = a.priceValue;
      const priceB = b.priceValue;

      if (sortOption === "low") {
        return priceA - priceB;
      }

      if (sortOption === "high") {
        return priceB - priceA;
      }

      return 0;
    }
  );

  // Reset filters
  const resetFilters = () => {
    setPriceFilter("all");
    setDiscountFilter("all");
    setReviewFilter("all");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-24">
      {/* Header */}
      <Header />

      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Items + Sort + Filter */}
      <section className="mx-auto mt-7 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          {/* Number of Items */}
          <h1 className="text-[20px] font-semibold text-gray-900 md:text-2xl">
            {sortedProducts.length.toLocaleString()} Items
          </h1>

          {/* Sort + Filter */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm text-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.08)] md:px-4 md:py-2.5"
              >
                <span>Sort</span>
                <ArrowDownUp
                  size={15}
                  strokeWidth={2}
                  className="md:h-4 md:w-4"
                />
              </button>

              {showSort && (
                <div className="absolute right-0 top-11 z-20 w-48 rounded-lg bg-white p-2 shadow-lg md:top-12">
                  <button
                    onClick={() => {
                      setSortOption("recommended");
                      setShowSort(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Recommended
                  </button>

                  <button
                    onClick={() => {
                      setSortOption("low");
                      setShowSort(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Price: Low to High
                  </button>

                  <button
                    onClick={() => {
                      setSortOption("high");
                      setShowSort(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Price: High to Low
                  </button>
                </div>
              )}
            </div>

            {/* Filter */}
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm text-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.08)] md:px-4 md:py-2.5"
            >
              <span>Filter</span>
              <Funnel
                size={15}
                strokeWidth={2}
                className="md:h-4 md:w-4"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto mt-5 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-x-5 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-7">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* No products found */}
        {sortedProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">
              No products match your filters.
            </p>
          </div>
        )}
      </section>

      {/* Filter Bottom Sheet */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-h-[90vh] max-w-md overflow-y-auto rounded-t-3xl bg-white px-5 pb-28 pt-5 md:max-w-lg md:px-7">
            {/* Header */}
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Filters
              </h2>

              <button
                onClick={() => setShowFilter(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Price */}
            <div className="mb-7">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Price
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "All"],
                  ["under500", "Under $500"],
                  ["500-1000", "$500 - $1,000"],
                  ["1000-5000", "$1,000 - $5,000"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setPriceFilter(value)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      priceFilter === value
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div className="mb-7">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Discount
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "Any"],
                  ["10", "10% & up"],
                  ["15", "15% & up"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setDiscountFilter(value)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      discountFilter === value
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Ratings
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  ["all", "Any"],
                  ["3", "3+ ⭐"],
                  ["4", "4+ ⭐"],
                  ["4.5", "4.5+ ⭐"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setReviewFilter(value)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      reviewFilter === value
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 rounded-xl border border-gray-200 py-3 font-medium text-gray-700"
              >
                Reset
              </button>

              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 rounded-xl bg-indigo-500 py-3 font-medium text-white"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}