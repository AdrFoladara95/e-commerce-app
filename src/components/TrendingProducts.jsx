import ProductCard from "./ProductCard";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";
export default function TrendingProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const productsRef = useRef(null);
  const updateScrollButtons = () => {
    const container = productsRef.current;
    if (!container) return;
    const maxScrollLeft =
      container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(
      maxScrollLeft > 2 &&
      container.scrollLeft < maxScrollLeft - 2
    );
  };
  useEffect(() => {
    getProducts()
      .then((data) => {
        const trending = [...data]
          .sort(
            (a, b) =>
              (b.ratingValue ?? 0) - (a.ratingValue ?? 0)
          )
          .slice(0, 8);
        setProducts(trending);
      })
      .catch((error) => {
        console.error(
          "Failed to load trending products:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (loading) return;
    const container = productsRef.current;
    if (!container) return;
    updateScrollButtons();
    container.addEventListener(
      "scroll",
      updateScrollButtons,
      { passive: true }
    );
    window.addEventListener(
      "resize",
      updateScrollButtons
    );
    return () => {
      container.removeEventListener(
        "scroll",
        updateScrollButtons
      );
      window.removeEventListener(
        "resize",
        updateScrollButtons
      );
    };
  }, [loading, products]);
  const scrollLeft = () => {
    productsRef.current?.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    productsRef.current?.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };
  return (
    <section className="mx-auto mt-6 w-full max-w-7xl">
      {/* Header */}
      <div className="mx-5 flex items-center justify-between rounded-lg bg-[#FD6E86] px-4 py-3 text-white sm:mx-6 md:mx-8 md:px-6 md:py-4 lg:mx-10 lg:px-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold md:text-lg">
            Trending Products
          </h2>
          <span className="flex items-center gap-2 text-xs font-medium md:text-sm">
            <CalendarDays size={16} />
            Popular right now
          </span>
        </div>
        <button
          onClick={() => navigate("/trending-products")}
          className="flex items-center gap-2 rounded-md border border-white px-4 py-2 text-xs font-medium md:px-5 md:py-2.5 md:text-sm"
        >
          View all
          <img
            src="/arrow.png"
            alt=""
            className="h-4 w-4"
          />
        </button>
      </div>
      {/* Products */}
      <div className="relative mt-4 px-5 sm:px-6 md:px-8 lg:px-10">
        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading trending products...
          </div>
        ) : (
          <>
            {/* Mobile carousel */}
            <div
              ref={productsRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:hidden"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            {/* Tablet and desktop grid */}
            <div className="hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Mobile Previous Arrow */}
        {!loading && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4C4C4] shadow-lg md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft
              size={20}
              className="text-gray-700"
            />
          </button>
        )}
        {/* Mobile Next Arrow */}
        {!loading && canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#C4C4C4] shadow-lg md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight
              size={20}
              className="text-gray-700"
            />
          </button>
        )}
      </div>
    </section>
  );
}