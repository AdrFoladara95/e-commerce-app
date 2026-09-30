import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!email) {
      alert(
        "Password reset session has expired. Please try again."
      );
      navigate("/forgot-password");
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
      }
    }

    const normalizedEmail = email.trim().toLowerCase();

    const accountIndex = accounts.findIndex(
      (account) =>
        account.email.trim().toLowerCase() ===
        normalizedEmail
    );

    if (accountIndex === -1) {
      alert("No account was found with this email address.");
      navigate("/forgot-password");
      return;
    }

    const updatedAccounts = [...accounts];

    updatedAccounts[accountIndex] = {
      ...updatedAccounts[accountIndex],
      password,
    };

    localStorage.setItem(
      "accounts",
      JSON.stringify(updatedAccounts)
    );

    alert("Password reset successfully.");

    navigate("/login");
  };

  if (!email) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center sm:px-8">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Reset link expired
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          Please request a new password reset.
        </p>

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="mt-5 rounded-xl bg-[#F83758] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d92f4c] sm:text-base"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <h1 className="text-[40px] font-bold leading-[1.05] tracking-[-1px] text-[#111827] sm:text-[44px] md:text-[48px]">
          Reset
          <br />
          Password
        </h1>

        {/* Account Email */}
        <p className="mt-5 text-sm leading-6 text-gray-500 sm:text-base">
          Create a new password for{" "}
          <span className="font-medium text-gray-700">
            {email}
          </span>
        </p>

        {/* Form */}
        <form
          className="mt-9 sm:mt-10"
          onSubmit={handleResetPassword}
        >
          {/* New Password */}
          <div className="flex h-14 w-full items-center rounded-xl border border-gray-400 bg-gray-100 px-4 md:h-15">
            <Lock
              size={22}
              strokeWidth={2.5}
              className="shrink-0 text-[#555]"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="ml-4 w-full bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#666]"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="ml-2 shrink-0 text-[#555]"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <Eye size={22} strokeWidth={2.5} />
              ) : (
                <EyeOff size={22} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mt-6 flex h-14 w-full items-center rounded-xl border border-gray-400 bg-gray-100 px-4 md:mt-7 md:h-15">
            <Lock
              size={22}
              strokeWidth={2.5}
              className="shrink-0 text-[#555]"
            />

            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
              className="ml-4 w-full bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#666]"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="ml-2 shrink-0 text-[#555]"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <Eye size={22} strokeWidth={2.5} />
              ) : (
                <EyeOff size={22} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* Password Requirement */}
          <p className="mt-5 text-sm leading-6 text-gray-500 sm:text-base">
            Your password must be at least 6 characters.
          </p>

          {/* Reset Button */}
          <button
            type="submit"
            className="mt-8 h-14 w-full rounded-md bg-[#F83758] text-lg font-semibold text-white transition hover:bg-[#d92f4c] md:h-15"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}