import React, { useState, useEffect } from "react";
import { ArrowLeft, Minus, Plus, SquarePen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems } = useCart();

  const product = location.state?.product;
  const isBuyNow = Boolean(product);

  const [quantity, setQuantity] = useState(1);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      setProfile(null);
      return;
    }

    const normalizedEmail = user.email.trim().toLowerCase();
    const profileKey = `profile_${normalizedEmail}`;

    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
  }, []);

  const checkoutCartItems = isBuyNow ? [] : cartItems;

  if (!isBuyNow && checkoutCartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Your cart is empty
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add a product to your cart before checking out.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-medium text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const productPrice = product
    ? parseFloat(String(product.price).replace(/[^\d.]/g, ""))
    : 0;

  const buyNowTotal = productPrice * quantity;

  const cartTotal = checkoutCartItems.reduce((sum, item) => {
    const price = parseFloat(
      String(item.price).replace(/[^\d.]/g, "")
    );

    return sum + price * item.quantity;
  }, 0);

  const total = isBuyNow ? buyNowTotal : cartTotal;

  const totalItems = isBuyNow
    ? quantity
    : checkoutCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

  const hasCompleteDeliveryDetails =
    Boolean(profile?.fullName?.trim()) &&
    Boolean(profile?.mobileNumber?.trim()) &&
    Boolean(profile?.address?.trim()) &&
    Boolean(profile?.city?.trim()) &&
    Boolean(profile?.state?.trim()) &&
    Boolean(profile?.country?.trim()) &&
    Boolean(profile?.pincode?.toString().trim());

  const handleProceedToPayment = () => {
    if (!hasCompleteDeliveryDetails) {
      alert(
        "Please complete your delivery details before proceeding to payment."
      );
      return;
    }

    navigate("/payment", {
      state: {
        product,
        cartItems: isBuyNow ? [] : checkoutCartItems,
        total,
        profile,
        isCartCheckout: !isBuyNow,
        quantity,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-8 text-gray-900">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white p-5 shadow-xs md:p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
        >
          <ArrowLeft
            size={20}
            className="md:h-6 md:w-6"
          />
        </button>

        <h1 className="text-xl font-semibold md:text-2xl">
          Checkout
        </h1>
      </header>

      {/* Main Checkout Area */}
      <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          {/* Left Side */}
          <div>
            {/* Products */}
            <section className="pt-5 md:pt-7">
              <h2 className="mb-3 text-base font-semibold md:text-lg">
                {isBuyNow ? "Product" : "Products"}
              </h2>

              {isBuyNow ? (
                <div className="flex gap-3 rounded-xl bg-white p-3 shadow-sm md:gap-5 md:p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 shrink-0 rounded-lg bg-gray-100 object-cover md:h-32 md:w-32"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold md:text-base">
                      {product.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500 md:text-sm">
                      {product.description}
                    </p>

                    <p className="mt-2 text-base font-bold md:text-lg">
                      {product.price}
                    </p>

                    <div className="mt-3 flex items-center">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() =>
                            setQuantity((current) =>
                              Math.max(1, current - 1)
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center md:h-9 md:w-9"
                          aria-label="Decrease quantity"
                        >
                          <Minus
                            size={15}
                            className="md:h-4 md:w-4"
                          />
                        </button>

                        <span className="w-8 text-center text-sm font-medium md:w-10">
                          {quantity}
                        </span>

                        <button
                          onClick={() =>
                            setQuantity((current) => current + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center md:h-9 md:w-9"
                          aria-label="Increase quantity"
                        >
                          <Plus
                            size={15}
                            className="md:h-4 md:w-4"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {checkoutCartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl bg-white p-3 shadow-sm md:gap-5 md:p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 shrink-0 rounded-lg bg-gray-100 object-cover md:h-32 md:w-32"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold md:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs text-gray-500 md:text-sm">
                          {item.description}
                        </p>

                        <p className="mt-2 text-base font-bold md:text-lg">
                          {item.price}
                        </p>

                        <p className="text-sm text-gray-500 md:text-base">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Delivery Address */}
            <section className="pt-5 md:pt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold md:text-lg">
                  Delivery Address
                </h2>

                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-1 text-sm font-medium text-red-400"
                  aria-label="Edit delivery address"
                >
                  <SquarePen
                    size={15}
                    className="md:h-4 md:w-4"
                  />
                </button>
              </div>

              <div className="mt-3 rounded-xl bg-white p-4 shadow-sm md:p-5">
                {hasCompleteDeliveryDetails ? (
                  <>
                    <p className="text-sm font-semibold text-gray-900 md:text-base">
                      {profile.fullName}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {profile.email}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {profile.mobileNumber}
                    </p>

                    <p className="mt-3 text-sm text-gray-700 md:text-base">
                      {profile.address}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {profile.city}, {profile.state}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {profile.country} - {profile.pincode}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-900 md:text-base">
                      Delivery details incomplete.
                    </p>

                    <p className="mt-1 text-sm text-gray-500 md:text-base">
                      Please add your name, mobile number, address,
                      city, state, country and pincode before
                      continuing.
                    </p>

                    <button
                      onClick={() => navigate("/profile")}
                      className="mt-3 rounded-lg bg-[#F83758] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Complete Delivery Details
                    </button>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="lg:sticky lg:top-6">
            {/* Order Summary */}
            <section className="mt-5 rounded-xl bg-white p-5 shadow-sm lg:mt-7 lg:p-6">
              <h2 className="text-base font-semibold md:text-lg">
                Order Summary
              </h2>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Items
                </span>

                <span className="text-sm font-medium">
                  {totalItems}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-sm font-medium">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="my-4 border-t border-gray-100" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-lg font-bold md:text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                className={`mt-5 w-full rounded-md py-3.5 text-sm font-semibold text-white shadow-sm ${
                  hasCompleteDeliveryDetails
                    ? "bg-[#F83758]"
                    : "bg-gray-300"
                }`}
              >
                Proceed to Payment
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}