import React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What payment methods can I use?",
      answer:
        "You can pay for your order using the payment methods available at checkout.",
    },
    {
      question: "When will I be charged?",
      answer:
        "Payment is processed when you complete your order through the checkout process.",
    },
    {
      question: "Why did my payment fail?",
      answer:
        "A payment may fail because of insufficient funds, an incorrect payment detail, or a temporary issue with the payment provider. Please check your details and try again.",
    },
    {
      question: "Why was I charged but my order was not placed?",
      answer:
        "If your account was charged but your order was not successfully placed, please contact our support team with your payment and order details.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refund eligibility depends on the circumstances of the order and the applicable return and refund policy.",
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
          Payments
        </h1>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Intro */}
        <section className="pt-6 md:pt-8">
          <div className="rounded-2xl bg-indigo-500 p-5 text-white md:p-7 lg:p-8">
            <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">
              Payments
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Find answers to common questions about payments,
              billing and refunds.
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