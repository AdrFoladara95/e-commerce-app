import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const accounts =
      JSON.parse(localStorage.getItem("accounts")) || [];

    const accountAlreadyExists = accounts.some(
      (account) =>
        account.email.trim().toLowerCase() === normalizedEmail
    );

    if (accountAlreadyExists) {
      alert("An account with this email already exists.");
      return;
    }

    const account = {
      email: normalizedEmail,
      password,
    };

    const updatedAccounts = [...accounts, account];

    localStorage.setItem(
      "accounts",
      JSON.stringify(updatedAccounts)
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <h1 className="text-[40px] font-bold leading-[1.05] tracking-[-1px] text-[#111827] sm:text-[44px] md:text-[48px]">
          Create an
          <br />
          account
        </h1>

        {/* Signup Form */}
        <form className="mt-9 sm:mt-10" onSubmit={handleSignup}>
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
                setShowConfirmPassword(!showConfirmPassword)
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

          {/* Public Offer */}
          <div className="mt-6">
            <p className="text-sm leading-6 text-[#777] md:text-base">
              By Clicking the{" "}
              <span className="text-[#f83758]">
                Register
              </span>{" "}
              button, you agree to the public offer
            </p>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            className="mt-9 h-14 w-full rounded-md bg-[#F83758] text-lg font-semibold text-white transition hover:bg-[#d92f4c] md:mt-10 md:h-15"
          >
            Create Account
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

        {/* Login */}
        <div className="mt-6 pb-4 text-center">
          <span className="text-sm text-[#777] md:text-base">
            I Already have An Account{" "}
          </span>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-[#F83758] underline md:text-base"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}