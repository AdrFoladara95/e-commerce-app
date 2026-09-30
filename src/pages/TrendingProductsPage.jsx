import { ArrowDownUp, Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";
import { getProducts } from "../api/products";
export default function TrendingProductsPage() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("trending");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("all");
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load trending products:", error);
      });
  }, []);
  const filteredProducts = products.filter((product) => {
    if (filterOption === "discount-10") {
      return product.discountValue >= 10;
    }
    if (filterOption === "discount-15") {
      return product.discountValue >= 15;
    }
    if (filterOption === "rating-4") {
      return product.ratingValue >= 4;
    }
    if (filterOption === "rating-4.5") {
      return product.ratingValue >= 4.5;
    }
    return true;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.priceValue - b.priceValue;
    }
    if (sortOption === "price-high") {
      return b.priceValue - a.priceValue;
    }
    if (sortOption === "rating") {
      return b.ratingValue - a.ratingValue;
    }
    return b.ratingValue - a.ratingValue;
  });
  const displayedProducts = sortedProducts.slice(0, 15);
  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-24">
      <Header />
      <SearchBar />
      <section className="mt-7 px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-semibold text-gray-900">
            {sortedProducts.length} Items
          </h1>
          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setFilterOpen(false);
                }}
                className="flex items-center gap-1 rounded-md bg-white px-4 py-1 text-sm text-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
              >
                <span>Sort</span>
                <ArrowDownUp size={15} strokeWidth={2} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-9 z-20 w-44 rounded-lg bg-white p-2 shadow-lg">
                  <button
                    onClick={() => {
                      setSortOption("trending");
                      setSortOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Trending
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("price-low");
                      setSortOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("price-high");
                      setSortOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("rating");
                      setSortOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Rating
                  </button>
                </div>
              )}
            </div>
            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setFilterOpen(!filterOpen);
                  setSortOpen(false);
                }}
                className="flex items-center gap-1 rounded-md bg-white px-4 py-1 text-sm text-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
              >
                <span>Filter</span>
                <Funnel size={15} strokeWidth={2} />
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-9 z-20 w-44 rounded-lg bg-white p-2 shadow-lg">
                  <button
                    onClick={() => {
                      setFilterOption("all");
                      setFilterOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => {
                      setFilterOption("discount-10");
                      setFilterOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    10%+ Discount
                  </button>
                  <button
                    onClick={() => {
                      setFilterOption("discount-15");
                      setFilterOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    15%+ Discount
                  </button>
                  <button
                    onClick={() => {
                      setFilterOption("rating-4");
                      setFilterOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Rating 4+
                  </button>
                  <button
                    onClick={() => {
                      setFilterOption("rating-4.5");
                      setFilterOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Rating 4.5+
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 px-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <BottomNav />
    </div>
  );
}