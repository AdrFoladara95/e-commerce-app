import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  Mail,
  MessageCircle,
  Package,
  CreditCard,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  const helpOptions = [
    {
      icon: Package,
      title: "Orders & Delivery",
      description: "Track orders, delivery and returns",
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Payment methods and billing questions",
    },
    {
      icon: Truck,
      title: "Shipping & Returns",
      description: "Shipping information and return policies",
    },
    {
      icon: CircleHelp,
      title: "General Questions",
      description: "Get answers to common questions",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-8 text-gray-900">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white px-5 py-5 shadow-sm md:px-8 md:py-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="md:h-6 md:w-6" />
        </button>

        <h1 className="text-xl font-semibold md:text-2xl">
          Help & Support
        </h1>
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Intro */}
        <section className="pt-6 md:pt-8">
          <div className="rounded-2xl bg-indigo-500 p-5 text-white md:p-7 lg:p-8">
            <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
              How can we help?
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Find answers to common questions or contact our
              support team.
            </p>
          </div>
        </section>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Help Topics */}
          <section className="pt-6 md:pt-8">
            <h2 className="text-base font-semibold md:text-lg">
              Help Topics
            </h2>

            <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
              {helpOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <button
                    key={option.title}
                    onClick={() => {
                      if (option.title === "Orders & Delivery") {
                        navigate("/help/orders");
                      }

                      if (option.title === "Payments") {
                        navigate("/help/payments");
                      }

                      if (option.title === "Shipping & Returns") {
                        navigate("/help/shipping");
                      }

                      if (option.title === "General Questions") {
                        navigate("/help/general");
                      }
                    }}
                    className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm transition hover:bg-gray-50 md:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 md:h-12 md:w-12">
                      <Icon size={21} className="md:h-5.5 md:w-5.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold md:text-base">
                        {option.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500 md:text-sm">
                        {option.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className="shrink-0 text-gray-400 md:h-5 md:w-5"
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Contact Us */}
          <section className="pt-6 md:pt-8">
            <h2 className="text-base font-semibold md:text-lg">
              Contact Us
            </h2>

            <div className="mt-3 space-y-3">
              {/* Chat Support */}
              <button
                onClick={() => navigate("/help/chat")}
                className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm transition hover:bg-gray-50 md:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500 md:h-12 md:w-12">
                  <MessageCircle
                    size={21}
                    className="md:h-5.5 md:w-5.5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold md:text-base">
                    Chat with Support
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 md:text-sm">
                    Get help from our support team.
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-gray-400 md:h-5 md:w-5"
                />
              </button>

              {/* Email Support */}
              <button
                onClick={() => {
                  window.location.href =
                    "mailto:support@example.com?subject=Support%20Request&body=Hello%20Support%20Team,%0A%0AI%20need%20help%20with...";
                }}
                className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm transition hover:bg-gray-50 md:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 md:h-12 md:w-12">
                  <Mail
                    size={21}
                    className="md:h-5.5 md:w-5.5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold md:text-base">
                    Email Support
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 md:text-sm">
                    Send us a message and we'll get back to you.
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-gray-400 md:h-5 md:w-5"
                />
              </button>
            </div>

            {/* Support Message */}
            <section className="pt-6 md:pt-8">
              <div className="rounded-xl bg-white p-5 text-center shadow-sm md:p-6">
                <p className="text-sm text-gray-500 md:text-base">
                  Need more help?
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 md:text-base">
                  Our support team is here for you.
                </p>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}