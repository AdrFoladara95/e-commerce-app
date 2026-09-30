import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      alert("Please enter your email address.");
      return;
    }

    let accounts =
      JSON.parse(localStorage.getItem("accounts")) || [];

    // Keep old single-account data working if it exists.
    if (accounts.length === 0) {
      const oldAccount = JSON.parse(
        localStorage.getItem("account")
      );

      if (oldAccount) {
        accounts = [oldAccount];

        localStorage.setItem(
          "accounts",
          JSON.stringify(accounts)
        );
      }
    }

    const savedAccount = accounts.find(
      (account) =>
        account.email.trim().toLowerCase() === normalizedEmail
    );

    if (!savedAccount) {
      alert("No account was found with this email address.");
      return;
    }

    navigate("/reset-password", {
      state: {
        email: savedAccount.email,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <h1 className="text-[40px] font-bold leading-[1.05] tracking-[-1px] text-[#111827] sm:text-[44px] md:text-[48px]">
          Forgot
          <br />
          Password?
        </h1>

        {/* Form */}
        <form
          className="mt-9 sm:mt-10"
          onSubmit={handleSubmit}
        >
          <div className="flex h-14 w-full items-center rounded-xl border border-gray-400 bg-gray-100 px-4 md:h-15">
            <Mail
              size={22}
              strokeWidth={2.5}
              className="shrink-0 text-[#555]"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="ml-4 w-full bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#666]"
            />
          </div>

          {/* Information */}
          <div className="mt-6">
            <p className="text-sm leading-6 text-[#777] md:text-base md:leading-7">
              <span className="text-[#f83758]">*</span>{" "}
              We will send you a message to set or reset
              your new password
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-9 h-14 w-full rounded-md bg-[#F83758] text-lg font-semibold text-white transition hover:bg-[#d92f4c] md:mt-10 md:h-15"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}