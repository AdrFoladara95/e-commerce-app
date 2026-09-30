import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Package,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo2.png";
import avatar from "../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(avatar);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const loadProfileImage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      setProfileImage(avatar);
      return;
    }

    const normalizedEmail = user.email.trim().toLowerCase();
    const profileKey = `profile_${normalizedEmail}`;
    const savedProfile = localStorage.getItem(profileKey);

    if (!savedProfile) {
      setProfileImage(avatar);
      return;
    }

    try {
      const profile = JSON.parse(savedProfile);
      setProfileImage(profile.profileImage || avatar);
    } catch {
      setProfileImage(avatar);
    }
  };

  useEffect(() => {
    loadProfileImage();

    window.addEventListener(
      "profileImageUpdated",
      loadProfileImage
    );

    return () => {
      window.removeEventListener(
        "profileImageUpdated",
        loadProfileImage
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setProfileImage(avatar);
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-4 pt-5 sm:px-6 md:px-8 lg:px-10 lg:pb-5 lg:pt-7">
        {/* Menu button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="rounded-full bg-gray-100 p-2 text-black transition hover:bg-gray-200 md:p-2.5"
          aria-label="Open menu"
        >
          <Menu
            size={28}
            strokeWidth={2}
            className="md:h-7 md:w-7"
          />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="h-auto w-28 object-contain md:w-32 lg:w-36"
          />
        </div>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          aria-label="Open profile"
          className="rounded-full"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12"
          />
        </button>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Side Menu */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col transform bg-white shadow-xl transition-transform duration-300 sm:w-80 md:w-88 lg:w-96 ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6 md:px-7 md:py-6 lg:px-8">
          <img
            src={logo}
            alt="Logo"
            className="h-auto w-24 object-contain sm:w-26 md:w-28 lg:w-30"
          />

          <button
            onClick={closeMenu}
            className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200 md:p-2.5"
            aria-label="Close menu"
          >
            <X size={22} className="md:h-6 md:w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 sm:px-5 md:px-6 md:py-6 lg:px-7">
          <div className="space-y-1 md:space-y-1.5">
            <button
              onClick={() => handleNavigation("/home")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <Home size={21} className="md:h-6 md:w-6" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavigation("/shop")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <ShoppingBag size={21} className="md:h-6 md:w-6" />
              <span>Shop</span>
            </button>

            <button
              onClick={() => handleNavigation("/wishlist")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <Heart size={21} className="md:h-6 md:w-6" />
              <span>Wishlist</span>
            </button>

            <button
              onClick={() => handleNavigation("/cart")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <ShoppingCart size={21} className="md:h-6 md:w-6" />
              <span>Cart</span>
            </button>

            <button
              onClick={() => handleNavigation("/orders")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <Package size={21} className="md:h-6 md:w-6" />
              <span>My Orders</span>
            </button>
          </div>

          <div className="my-4 border-t border-gray-100 md:my-5" />

          <div className="space-y-1 md:space-y-1.5">
            <button
              onClick={() => handleNavigation("/profile")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <User size={21} className="md:h-6 md:w-6" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => handleNavigation("/help")}
              className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-500 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
            >
              <HelpCircle size={21} className="md:h-6 md:w-6" />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="my-4 border-t border-gray-100 md:my-5" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-50 md:gap-5 md:px-5 md:py-3.5 lg:text-base"
          >
            <LogOut size={21} className="md:h-6 md:w-6" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}