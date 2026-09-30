import React from "react";
import {
  CheckCircle,
  ShoppingBag,
  Package,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <Package
          size={50}
          className="text-gray-400 md:h-14 md:w-14"
        />

        <h2 className="mt-4 text-lg font-semibold text-gray-900 md:text-xl">
          No order found
        </h2>

        <p className="mt-1 text-sm text-gray-500 md:text-base">
          We couldn't find your order details.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-medium text-white md:px-7 md:py-3.5 md:text-base"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-5 py-8 pb-10 text-gray-900 sm:px-6 md:px-8 md:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 md:h-24 md:w-24">
            <CheckCircle
              size={48}
              className="text-green-500 md:h-14 md:w-14"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-5 text-center md:mt-6">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Order Placed!
          </h1>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Details */}
        <div className="mt-7 grid gap-4 md:mt-8 lg:grid-cols-2 lg:gap-6">
          {/* Order Details */}
          <div className="rounded-xl bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-base font-semibold md:text-lg">
              Order Details
            </h2>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500 md:text-base">
                Order Number
              </span>

              <span className="max-w-[55%] truncate text-right text-sm font-semibold md:text-base">
                #{order.id}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500 md:text-base">
                Status
              </span>

              <span className="text-sm font-semibold text-green-500 md:text-base">
                {order.status}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 md:text-base">
                Payment
              </span>

              <span className="text-right text-sm font-semibold md:text-base">
                {order.paymentMethod}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500 md:text-base">
                Total
              </span>

              <span className="text-lg font-bold md:text-xl">
                ${Number(order.total).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          {order.deliveryDetails && (
            <div className="rounded-xl bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-base font-semibold md:text-lg">
                Delivery Address
              </h2>

              <p className="mt-3 text-sm font-semibold text-gray-900 md:text-base">
                {order.deliveryDetails.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {order.deliveryDetails.email}
              </p>

              {/* Mobile Number */}
              <p className="mt-1 text-sm text-gray-500">
                {order.deliveryDetails.mobileNumber ||
                  "Mobile number not provided"}
              </p>

              <p className="mt-3 text-sm text-gray-700 md:text-base">
                {order.deliveryDetails.address}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {order.deliveryDetails.city},{" "}
                {order.deliveryDetails.state}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {order.deliveryDetails.country} -{" "}
                {order.deliveryDetails.pincode}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2">
          <button
            onClick={() => navigate("/shop")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F83758] py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 md:py-4 md:text-base"
          >
            <ShoppingBag
              size={18}
              className="md:h-5 md:w-5"
            />

            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 md:py-4 md:text-base"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}