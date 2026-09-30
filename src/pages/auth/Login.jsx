import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Login() {
  const navigate = useNavigate();

  const { reloadCart } = useCart();
  const { reloadWishlist } = useWishlist();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      alert("Please enter your email and password.");
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
      alert("No account found. Please create an account first.");
      return;
    }

    if (password !== savedAccount.password) {
      alert("Invalid email or password.");
      return;
    }

    const user = {
      email: savedAccount.email,
      loggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Load this user's saved cart and wishlist.
    reloadCart();
    reloadWishlist();

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <h1 className="text-[40px] font-bold leading-[1.05] tracking-[-1px] text-[#111827] sm:text-[44px] md:text-[48px]">
          Welcome
          <br />
          Back!
        </h1>

        {/* Login Form */}
        <form className="mt-9 sm:mt-10" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex h-14 w-full items-center rounded-xl border border-gray-400 bg-gray-100 px-4 md:h-15">
            <User
              size={22}
              strokeWidth={2.5}
              className="shrink-0 text-[#555]"
            />

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username or Email"
              className="ml-4 w-full bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#666]"
            />
          </div>

          {/* Password */}
          <div className="mt-6 flex h-14 w-full items-center rounded-xl border border-gray-400 bg-gray-100 px-4 md:mt-7 md:h-15">
            <Lock
              size={22}
              strokeWidth={2.5}
              className="shrink-0 text-[#555]"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="ml-4 w-full bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#666]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

          {/* Forgot Password */}
          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-[#F83758] md:text-base"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-9 h-14 w-full rounded-md bg-[#F83758] text-lg font-semibold text-white transition hover:bg-[#d92f4c] md:mt-10 md:h-15"
          >
            Login
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-12 text-center sm:mt-14">
          <p className="text-sm text-[#555] md:text-base">
            - OR Continue with -
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4 sm:gap-5">
          <button
            type="button"
            className="flex h-13 w-13 items-center justify-center rounded-full border border-[#F83758] bg-[#f8375714] sm:h-14 sm:w-14"
          >
            <FcGoogle size={28} />
          </button>

          <button
            type="button"
            className="flex h-13 w-13 items-center justify-center rounded-full border border-[#F83758] bg-[#f8375714] sm:h-14 sm:w-14"
          >
            <FaApple
              size={27}
              className="text-black"
            />
          </button>

          <button
            type="button"
            className="flex h-13 w-13 items-center justify-center rounded-full border border-[#F83758] bg-[#f8375714] sm:h-14 sm:w-14"
          >
            <FaFacebookF
              size={25}
              className="text-[#1877F2]"
            />
          </button>
        </div>

        {/* Sign Up */}
        <div className="mt-6 pb-4 text-center">
          <span className="text-sm text-[#777] md:text-base">
            Create An Account{" "}
          </span>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-sm font-medium text-[#F83758] underline md:text-base"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}