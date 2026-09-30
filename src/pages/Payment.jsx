import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { clearCart, cartItems: currentCartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const user = JSON.parse(localStorage.getItem("user"));

  const {
    product,
    total,
    profile,
    isCartCheckout,
    quantity = 1,
  } = location.state || {};

  const checkoutCartItems = isCartCheckout
    ? currentCartItems
    : [];

  // Make sure the user came from Checkout
  if (
    !product &&
    (!isCartCheckout || checkoutCartItems.length === 0)
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          No order found
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please return to checkout and try again.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-5 rounded-xl bg-red-400 px-6 py-3 text-sm font-medium text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    if (paymentMethod !== "cod") {
      alert(
        `${
          paymentMethod === "card"
            ? "Card payment"
            : "Wallet payment"
        } is not connected yet.`
      );

      return;
    }

    if (!user?.email) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    // Check delivery information before creating the order.
    const buyerName = profile?.accountName?.trim();
    const mobileNumber =
      profile?.mobileNumber?.toString().trim();
    const address = profile?.address?.trim();
    const city = profile?.city?.trim();
    const state = profile?.state?.trim();
    const country = profile?.country?.trim();
    const pincode = profile?.pincode?.toString().trim();

    const missingDetails = [];

    if (!buyerName) {
      missingDetails.push("name");
    }

    if (!mobileNumber) {
      missingDetails.push("mobile number");
    }

    if (!address) {
      missingDetails.push("address");
    }

    if (!city) {
      missingDetails.push("city");
    }

    if (!state) {
      missingDetails.push("state");
    }

    if (!country) {
      missingDetails.push("country");
    }

    if (!pincode) {
      missingDetails.push("pincode");
    }

    if (missingDetails.length > 0) {
      alert(
        `Please complete your delivery details before placing your order.\n\nMissing: ${missingDetails.join(
          ", "
        )}`
      );

      return;
    }

    const normalizedEmail =
      user.email.trim().toLowerCase();

    // Save the delivery information directly with the order.
    const deliveryDetails = {
      name: buyerName,
      email: user.email,
      mobileNumber,
      address,
      city,
      state,
      country,
      pincode,
    };

    const order = {
      id: Date.now(),

      items: isCartCheckout
        ? checkoutCartItems
        : [{ ...product, quantity }],

      total,

      deliveryDetails,

      paymentMethod: "Cash on Delivery",

      date: new Date().toISOString(),

      status: "Order Placed",
    };

    // Each account has its own order storage.
    const ordersKey = `orders_${normalizedEmail}`;

    const existingOrders =
      JSON.parse(localStorage.getItem(ordersKey)) || [];

    localStorage.setItem(
      ordersKey,
      JSON.stringify([...existingOrders, order])
    );

    // Only clear the cart when the user checked out the cart.
    // Buy Now should not remove anything already in the cart.
    if (isCartCheckout) {
      clearCart();
    }

    navigate("/order-success", {
      state: {
        order,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-28 text-gray-900">
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
          Payment
        </h1>
      </header>

      {/* Main Payment Area */}
      <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          {/* Left Side */}
          <div>
            {/* Order Total */}
            <section className="pt-5 md:pt-7">
              <div className="rounded-xl bg-white p-5 shadow-sm md:p-6">
                <p className="text-sm text-gray-500 md:text-base">
                  Total Amount
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                  ${Number(total).toFixed(2)}
                </h2>
              </div>
            </section>

            {/* Payment Methods */}
            <section className="pt-5 md:pt-7">
              <h2 className="text-base font-semibold md:text-lg">
                Choose Payment Method
              </h2>

              <div className="mt-3 space-y-3">
                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 text-left shadow-sm md:p-5 ${
                    paymentMethod === "cod"
                      ? "border-2 border-red-400 bg-white"
                      : "border border-transparent bg-white"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 md:h-12 md:w-12">
                    <Banknote
                      size={20}
                      className="md:h-6 md:w-6"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold md:text-base">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500 md:text-sm">
                      Pay when your order arrives.
                    </p>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      paymentMethod === "cod"
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    )}
                  </div>
                </button>

                {/* Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 text-left shadow-sm md:p-5 ${
                    paymentMethod === "card"
                      ? "border-2 border-red-400 bg-white"
                      : "border border-transparent bg-white"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 md:h-12 md:w-12">
                    <CreditCard
                      size={20}
                      className="md:h-6 md:w-6"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold md:text-base">
                        Card Payment
                      </p>

                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 md:text-xs">
                        Coming soon
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-gray-500 md:text-sm">
                      Pay securely with your debit or credit card.
                    </p>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      paymentMethod === "card"
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    )}
                  </div>
                </button>

                {/* Wallet */}
                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 text-left shadow-sm md:p-5 ${
                    paymentMethod === "wallet"
                      ? "border-2 border-red-400 bg-white"
                      : "border border-transparent bg-white"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 md:h-12 md:w-12">
                    <Wallet
                      size={20}
                      className="md:h-6 md:w-6"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold md:text-base">
                        Wallet
                      </p>

                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 md:text-xs">
                        Coming soon
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-gray-500 md:text-sm">
                      Pay using your digital wallet.
                    </p>
                  </div>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      paymentMethod === "wallet"
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "wallet" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    )}
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="lg:sticky lg:top-6">
            {/* Delivery Details */}
            <section className="pt-5 md:pt-7 lg:pt-7">
              <h2 className="text-base font-semibold md:text-lg">
                Delivery Details
              </h2>

              {profile ? (
                <div className="mt-3 rounded-xl bg-white p-4 shadow-sm md:p-5">
                  <p className="text-sm font-semibold md:text-base">
                    {profile.accountName || "Name not provided"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {user?.email}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {profile.mobileNumber ||
                      "Mobile number not provided"}
                  </p>

                  <p className="mt-3 text-sm text-gray-700 md:text-base">
                    {profile.address || "Address not provided"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {profile.city || "City not provided"}
                    {profile.city && profile.state ? ", " : ""}
                    {profile.state || "State not provided"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {profile.country || "Country not provided"}
                    {profile.country && profile.pincode
                      ? " - "
                      : ""}
                    {profile.pincode || "Pincode not provided"}
                  </p>
                </div>
              ) : (
                <div className="mt-3 rounded-xl bg-white p-4 shadow-sm md:p-5">
                  <p className="text-sm text-red-500 md:text-base">
                    Delivery details have not been provided.
                  </p>
                </div>
              )}

              {/* Pay / Place Order Button */}
              <button
                onClick={handlePayment}
                className="mt-5 w-full rounded-xl bg-[#F83758] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 md:py-4 md:text-base"
              >
                {paymentMethod === "cod"
                  ? "Place Order"
                  : `Pay $${Number(total).toFixed(2)}`}
              </button>
            </section>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}