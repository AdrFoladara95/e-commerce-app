import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  LockKeyhole,
  Package,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(avatar);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user?.email) {
      return;
    }

    const normalizedEmail = user.email.trim().toLowerCase();

    setEmail(user.email);

    const profileKey = `profile_${normalizedEmail}`;

    const savedProfile = localStorage.getItem(profileKey);

    setProfileImage(avatar);

    if (!savedProfile) {
      return;
    }

    try {
      const data = JSON.parse(savedProfile);

      if (!data || typeof data !== "object") {
        return;
      }

      setProfileImage(data.profileImage || avatar);
      setFullName(data.fullName || "");
      setPassword(data.password || "");
      setMobileNumber(data.mobileNumber || "");
      setPincode(data.pincode || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setState(data.state || "");
      setCountry(data.country || "");
      setAccountNumber(data.accountNumber || "");
      setAccountName(data.accountName || "");
      setBankName(data.bankName || "");
    } catch {
      console.log("Unable to load saved profile.");
    }
  }, []);

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const getSavedProfile = (profileKey) => {
    try {
      const savedProfile = JSON.parse(
        localStorage.getItem(profileKey)
      );

      return savedProfile &&
        typeof savedProfile === "object"
        ? savedProfile
        : {};
    } catch {
      return {};
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const user = getCurrentUser();

    if (!user?.email) {
      alert("Please log in first.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setProfileImage(imageData);

      const normalizedEmail =
        user.email.trim().toLowerCase();

      const profileKey = `profile_${normalizedEmail}`;

      const savedProfile =
        getSavedProfile(profileKey);

      const updatedProfile = {
        ...savedProfile,
        email: user.email,
        profileImage: imageData,
      };

      localStorage.setItem(
        profileKey,
        JSON.stringify(updatedProfile)
      );

      window.dispatchEvent(
        new Event("profileImageUpdated")
      );
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleSave = () => {
    const user = getCurrentUser();

    if (!user?.email) {
      alert("Please log in first.");
      return;
    }

    const normalizedEmail =
      user.email.trim().toLowerCase();

    const profileKey = `profile_${normalizedEmail}`;

    const profileData = {
      profileImage,
      fullName,
      email: user.email,
      password,
      mobileNumber,
      pincode,
      address,
      city,
      state,
      country,
      accountNumber,
      accountName,
      bankName,
    };

    localStorage.setItem(
      profileKey,
      JSON.stringify(profileData)
    );

    window.dispatchEvent(
      new Event("profileImageUpdated")
    );

    alert("Profile saved successfully.");
  };

  const handleDeleteAccount = () => {
    const user = getCurrentUser();

    if (!user?.email) {
      alert("Please log in first.");
      return;
    }

    const normalizedEmail =
      user.email.trim().toLowerCase();

    const confirmed = window.confirm(
      "Are you sure you want to delete your account?\n\nYour profile, orders, cart, wishlist and login information will be permanently removed from this device."
    );

    if (!confirmed) {
      return;
    }

    const doubleConfirmed = window.confirm(
      "This action cannot be undone. Delete this account?"
    );

    if (!doubleConfirmed) {
      return;
    }

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

    const updatedAccounts = accounts.filter(
      (account) =>
        account?.email?.trim().toLowerCase() !==
        normalizedEmail
    );

    localStorage.setItem(
      "accounts",
      JSON.stringify(updatedAccounts)
    );

    localStorage.removeItem(
      `profile_${normalizedEmail}`
    );

    localStorage.removeItem(
      `cart_${normalizedEmail}`
    );

    localStorage.removeItem(
      `wishlist_${normalizedEmail}`
    );

    localStorage.removeItem(
      `orders_${normalizedEmail}`
    );

    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("profileImageUpdated")
    );

    alert("Your account has been deleted.");

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center px-6 pt-8 md:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full"
        >
          <ArrowLeft
            size={24}
            className="md:h-6 md:w-6"
          />
        </button>

        <h1 className="ml-3 text-2xl font-semibold text-[#111827] md:text-3xl">
          Profile
        </h1>
      </header>

      {/* Profile Content */}
      <main className="mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-10">
        {/* Profile Image */}
        <div className="mt-8 flex justify-center md:mt-10">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover md:h-32 md:w-32"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#F83758] text-white md:h-10 md:w-10"
            >
              <Camera
                size={18}
                className="md:h-5 md:w-5"
              />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Personal Information */}
        <section className="pt-8">
          <h2 className="text-lg font-semibold text-[#111827] md:text-xl">
            Personal Information
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Mobile Number
              </label>

              <input
                type="tel"
                inputMode="numeric"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter mobile number"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Password
              </label>

              <button
                type="button"
                onClick={() =>
                  navigate("/change-password")
                }
                className="flex h-14 w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-4"
              >
                <div className="flex items-center">
                  <LockKeyhole
                    size={20}
                    className="mr-3 text-[#555]"
                  />

                  <span className="text-[16px] text-[#333]">
                    Change Password
                  </span>
                </div>

                <ChevronRight
                  size={20}
                  className="text-[#777]"
                />
              </button>
            </div>

            {/* Pincode */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Pincode
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter pincode"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="pt-8">
          <h2 className="text-lg font-semibold text-[#111827] md:text-xl">
            Delivery Information
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-[#555]">
                Address
              </label>

              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Enter address"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                placeholder="Enter city"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                State
              </label>

              <input
                type="text"
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
                placeholder="Enter state"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Country
              </label>

              <input
                type="text"
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                placeholder="Enter country"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>
          </div>
        </section>

        {/* Bank Information */}
        <section className="pt-8">
          <h2 className="text-lg font-semibold text-[#111827] md:text-xl">
            Bank Information
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Account Number */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Account Number
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter account number"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="mb-2 block text-sm text-[#555]">
                Account Name
              </label>

              <input
                type="text"
                value={accountName}
                onChange={(e) => {
                  const value = e.target.value.replace(
                    /[^a-zA-ZÀ-ÿ\s'-]/g,
                    ""
                  );

                  setAccountName(value);
                }}
                placeholder="Enter account name"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>

            {/* Bank Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-[#555]">
                Bank Name
              </label>

              <input
                type="text"
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
                placeholder="Enter bank name"
                className="h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 text-[16px] text-[#333] outline-none placeholder:text-[#888]"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="pt-8">
          {/* Save */}
          <button
            type="button"
            onClick={handleSave}
            className="h-14 w-full rounded-xl bg-[#F83758] text-lg font-semibold text-white transition hover:bg-red-600"
          >
            Save Changes
          </button>

          {/* My Orders */}
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mt-4 flex h-14 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Package
                size={21}
                className="mr-3 text-[#555]"
              />

              <span className="text-[16px] text-[#333]">
                My Orders
              </span>
            </div>

            <ChevronRight
              size={20}
              className="text-[#777]"
            />
          </button>

          {/* Delete Account */}
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="mt-4 flex h-14 w-full items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 transition hover:bg-red-100"
          >
            <div className="flex items-center">
              <Trash2
                size={21}
                className="mr-3 text-red-500"
              />

              <span className="text-[16px] font-medium text-red-500">
                Delete Account
              </span>
            </div>

            <ChevronRight
              size={20}
              className="text-red-400"
            />
          </button>
        </section>
      </main>
    </div>
  );
}