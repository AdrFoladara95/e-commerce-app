import React from "react";
import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const normalizedEmail = user?.email
    ? user.email.trim().toLowerCase()
    : "";

  const ordersKey = normalizedEmail
    ? `orders_${normalizedEmail}`
    : null;

  const orders = ordersKey
    ? JSON.parse(localStorage.getItem(ordersKey)) || []
    : [];

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-8 text-gray-900">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white p-5 shadow-sm md:p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
        >
          <ArrowLeft size={20} className="md:h-6 md:w-6" />
        </button>

        <h1 className="text-xl font-semibold md:text-2xl">
          My Orders
        </h1>
      </header>

      {/* Orders */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-5 sm:px-6 md:px-8 md:pt-7 lg:px-10">
        {orders.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <Package
              size={50}
              className="text-gray-400 md:h-14 md:w-14"
            />

            <h2 className="mt-4 text-lg font-semibold md:text-xl">
              No orders yet
            </h2>

            <p className="mt-1 max-w-md text-sm text-gray-500 md:text-base">
              Your orders will appear here once you place an order.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600 md:px-7 md:py-3.5 md:text-base"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-5">
            {[...orders].reverse().map((order) => {
              const delivery = order.deliveryDetails || {};

              return (
                <div
                  key={order.id}
                  className="rounded-xl bg-white p-4 shadow-sm md:p-6"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500 md:text-sm">
                        Order Number
                      </p>

                      <p className="mt-1 text-sm font-semibold md:text-base">
                        #{order.id}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 md:px-4 md:py-1.5 md:text-sm">
                      {order.status}
                    </span>
                  </div>

                  <div className="my-4 border-t border-gray-100 md:my-5" />

                  {/* Buyer / Delivery Details */}
                  <div>
                    <h3 className="text-sm font-semibold md:text-base">
                      Delivery Details
                    </h3>

                    <div className="mt-3 rounded-lg bg-gray-50 p-3 md:p-4">
                      {delivery.name && (
                        <p className="text-sm font-semibold md:text-base">
                          {delivery.name}
                        </p>
                      )}

                      {delivery.email && (
                        <p className="mt-1 text-sm text-gray-500">
                          {delivery.email}
                        </p>
                      )}

                      {/* Mobile Number */}
                      {delivery.mobileNumber && (
                        <p className="mt-1 text-sm text-gray-500">
                          {delivery.mobileNumber}
                        </p>
                      )}

                      {delivery.address && (
                        <p className="mt-2 text-sm text-gray-700 md:text-base">
                          {delivery.address}
                        </p>
                      )}

                      {(delivery.city ||
                        delivery.state) && (
                        <p className="mt-1 text-sm text-gray-500">
                          {delivery.city}
                          {delivery.city &&
                          delivery.state
                            ? ", "
                            : ""}
                          {delivery.state}
                        </p>
                      )}

                      {(delivery.country ||
                        delivery.pincode) && (
                        <p className="mt-1 text-sm text-gray-500">
                          {delivery.country}
                          {delivery.country &&
                          delivery.pincode
                            ? " - "
                            : ""}
                          {delivery.pincode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="my-4 border-t border-gray-100 md:my-5" />

                  {/* Products */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold md:text-base">
                      Products
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 md:gap-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 object-cover md:h-20 md:w-20"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold md:text-base">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500 md:text-sm">
                              Quantity: {item.quantity}
                            </p>

                            <p className="mt-1 text-sm font-bold md:text-base">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="my-4 border-t border-gray-100 md:my-5" />

                  {/* Order Info */}
                  <div className="space-y-2 md:max-w-xl md:space-y-3">
                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500 md:text-base">
                        Payment
                      </span>

                      <span className="text-right text-sm font-medium md:text-base">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500 md:text-base">
                        Total
                      </span>

                      <span className="text-base font-bold md:text-lg">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-gray-500 md:text-base">
                        Date
                      </span>

                      <span className="text-right text-sm font-medium md:text-base">
                        {new Date(
                          order.date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}