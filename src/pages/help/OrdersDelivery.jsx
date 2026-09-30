import React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrdersDelivery() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from the Orders section in your profile. Select an order to view its current status and delivery information.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times depend on your location and the delivery option selected at checkout. You will see the expected delivery information when your order is placed.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can only be cancelled before they have been processed for delivery. Go to your Orders section and select the order you want to cancel.",
    },
    {
      question: "What if my order is delayed?",
      answer:
        "If your order has passed its expected delivery date, check the latest order status first. If you still need help, contact our support team.",
    },
    {
      question: "What if I receive the wrong item?",
      answer:
        "Please contact our support team as soon as possible and provide your order details. We will help you with the next steps.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-8 text-gray-900">
      {/* Header */}
      <header className="relative flex items-center justify-center bg-white px-5 py-5 shadow-sm md:px-8 md:py-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
          aria-label="Go back"
        >
          <ArrowLeft
            size={20}
            className="md:h-6 md:w-6"
          />
        </button>

        <h1 className="text-xl font-semibold md:text-2xl">
          Orders & Delivery
        </h1>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Intro */}
        <section className="pt-6 md:pt-8">
          <div className="rounded-2xl bg-indigo-500 p-5 text-white md:p-7 lg:p-8">
            <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
              Orders & Delivery
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Find answers to questions about your orders,
              delivery and cancellations.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="pt-6 md:pt-8">
          <h2 className="text-base font-semibold md:text-lg">
            Frequently Asked Questions
          </h2>

          <div className="mt-3 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left md:p-5"
                  >
                    <span className="text-sm font-semibold md:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-400 transition-transform md:h-5 md:w-5 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                      <p className="text-sm leading-6 text-gray-500 md:text-base md:leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}