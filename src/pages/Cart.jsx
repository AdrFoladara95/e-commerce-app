import React from "react";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-24">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white p-5 shadow-xs md:p-6">
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
          My Cart
        </h1>
      </header>

      {/* Cart Content */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-5 sm:px-6 md:px-8 md:pt-7 lg:px-10">
        {cartItems.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 md:h-24 md:w-24">
              <span className="text-3xl md:text-4xl">🛒</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              Your cart is empty
            </h2>

            <p className="mt-1 max-w-sm text-sm text-gray-500 md:text-base">
              Add some products to your cart and they will appear here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-medium text-white md:px-7 md:py-3.5 md:text-base"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
            {/* Cart Items */}
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
                  Cart Items
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {cartItems.length} product
                  {cartItems.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl bg-white p-3 shadow-sm md:gap-5 md:p-4"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 shrink-0 rounded-lg bg-gray-100 object-cover md:h-32 md:w-32"
                    />

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-gray-900 md:text-base">
                          {item.name}
                        </h3>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="shrink-0 text-gray-400 transition hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2
                            size={17}
                            className="md:h-5 md:w-5"
                          />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-bold text-gray-900 md:text-base">
                        {item.price}
                      </p>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center text-gray-600 md:h-9 md:w-9"
                            aria-label="Decrease quantity"
                          >
                            <Minus
                              size={15}
                              className="md:h-4 md:w-4"
                            />
                          </button>

                          <span className="w-8 text-center text-sm font-medium md:w-10">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center text-gray-600 md:h-9 md:w-9"
                            aria-label="Increase quantity"
                          >
                            <Plus
                              size={15}
                              className="md:h-4 md:w-4"
                            />
                          </button>
                        </div>

                        <span className="text-xs text-gray-500 md:text-sm">
                          {item.quantity} item
                          {item.quantity > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 rounded-xl bg-white p-5 shadow-sm lg:mt-0 lg:sticky lg:top-6 lg:p-6">
              <h2 className="text-base font-semibold text-gray-900 md:text-lg">
                Order Summary
              </h2>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="my-4 border-t border-gray-100" />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-lg font-bold text-gray-900 md:text-xl">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems,
                    },
                  })
                }
                className="mt-5 w-full rounded-xl bg-[#F83758] py-3 font-medium text-white transition hover:bg-red-600 md:py-3.5"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}