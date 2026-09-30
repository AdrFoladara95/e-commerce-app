import React, { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChangePassword = () => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user?.email) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const normalizedEmail = user.email.trim().toLowerCase();

    let accounts = [];

    try {
      const savedAccounts = JSON.parse(
        localStorage.getItem("accounts")
      );

      accounts = Array.isArray(savedAccounts)
        ? savedAccounts
        : [];
    } catch {
      accounts = [];
    }

    const accountIndex = accounts.findIndex(
      (account) =>
        account?.email?.trim().toLowerCase() === normalizedEmail
    );

    if (accountIndex === -1) {
      alert("Account not found.");
      return;
    }

    const savedAccount = accounts[accountIndex];

    if (!currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (currentPassword !== savedAccount.password) {
      alert("Current password is incorrect.");
      return;
    }

    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const updatedAccounts = [...accounts];

    updatedAccounts[accountIndex] = {
      ...savedAccount,
      password: newPassword,
    };

    localStorage.setItem(
      "accounts",
      JSON.stringify(updatedAccounts)
    );

    // Keep the profile's saved password in sync if a profile exists.
    const profileKey = `profile_${normalizedEmail}`;

    try {
      const savedProfile = JSON.parse(
        localStorage.getItem(profileKey)
      );

      if (savedProfile && typeof savedProfile === "object") {
        localStorage.setItem(
          profileKey,
          JSON.stringify({
            ...savedProfile,
            password: newPassword,
          })
        );
      }
    } catch {
      // Ignore invalid or missing profile data.
    }

    alert("Password changed successfully.");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900">
      <header className="relative flex items-center justify-center bg-white px-5 py-5 shadow-sm md:px-8 md:py-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 flex h-10 w-10 items-center justify-center md:left-8"
          aria-label="Go back"
        >
          <ArrowLeft size={21} className="md:h-6 md:w-6" />
        </button>

        <h1 className="text-xl font-semibold md:text-2xl">
          Change Password
        </h1>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 sm:px-6 md:px-8 lg:px-10">
        <section className="pt-6 md:pt-8">
          <div className="rounded-2xl bg-indigo-500 p-5 text-white md:p-7 lg:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 md:h-12 md:w-12">
              <LockKeyhole
                size={22}
                className="md:h-6 md:w-6"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold md:text-xl lg:text-2xl">
              Update your password
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              Enter your current password and choose a new
              password for your account.
            </p>
          </div>
        </section>

        <section className="pt-6 md:pt-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm md:p-7 lg:p-8">
            {/* Current Password */}
            <label className="text-sm font-medium text-gray-700 md:text-base">
              Current Password
            </label>

            <div className="relative mt-3">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-5 pr-12 text-base outline-none focus:border-red-400 md:h-15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    (current) => !current
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* New Password */}
            <label className="mt-6 block text-sm font-medium text-gray-700 md:text-base">
              New Password
            </label>

            <div className="relative mt-3">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-5 pr-12 text-base outline-none focus:border-red-400 md:h-15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    (current) => !current
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={
                  showNewPassword
                    ? "Hide new password"
                    : "Show new password"
                }
              >
                {showNewPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Confirm New Password */}
            <label className="mt-6 block text-sm font-medium text-gray-700 md:text-base">
              Confirm New Password
            </label>

            <div className="relative mt-3">
              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-5 pr-12 text-base outline-none focus:border-red-400 md:h-15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <button
              onClick={handleChangePassword}
              className="mt-7 w-full rounded-xl bg-[#F83758] py-4 text-base font-semibold text-white shadow-sm transition hover:bg-red-600 md:mt-8 md:py-4.5"
            >
              Change Password
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}