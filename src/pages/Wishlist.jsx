import React from "react";
import { ChevronLeft, Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-24">
      {/* Header */}
      <div className="relative flex items-center justify-center bg-white p-5 shadow-xs md:p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
        >
          <ChevronLeft
            size={25}
            className="md:h-7 md:w-7"
          />
        </button>

        <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Wishlist
        </h1>
      </div>

      <section className="mx-auto w-full max-w-7xl px-5 pt-5 sm:px-6 md:px-8 lg:px-10 md:pt-7">
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist */
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 md:h-24 md:w-24">
              <Heart
                size={32}
                className="text-gray-400 md:h-10 md:w-10"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              Your wishlist is empty
            </h2>

            <p className="mt-1 max-w-xs text-sm text-gray-500 md:max-w-sm md:text-base">
              Save products you love and they will appear here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-600 md:px-7 md:py-3.5 md:text-base"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Header */}
            <div className="mb-4 flex items-center justify-between md:mb-5">
              <p className="text-sm text-gray-500 md:text-base">
                {wishlistItems.length} product
                {wishlistItems.length > 1 ? "s" : ""} saved
              </p>
            </div>

            {/* Wishlist Products */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="relative"
                >
                  <ProductCard product={product} />

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <Trash2
                      size={17}
                      className="text-gray-500"
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <BottomNav />
    </div>
  );
}