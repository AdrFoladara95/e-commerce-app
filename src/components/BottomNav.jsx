import {
  Home,
  Heart,
  ShoppingCart,
  Search,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const isHomeActive = location.pathname === "/home";
  const isWishlistActive = location.pathname === "/wishlist";
  const isCartActive = location.pathname === "/cart";
  const isShopActive = location.pathname === "/shop";
  const isProfileActive = location.pathname === "/profile";

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white text-gray-700 md:left-1/2 md:w-[90%] md:max-w-3xl md:-translate-x-1/2 md:rounded-t-2xl md:border md:shadow-[0_0_30px_rgba(0,0,0,0.08)] lg:w-175">
      <div className="flex h-16 items-center justify-around px-2 md:h-18 md:px-6">

        {/* Home */}
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 ${
            isHomeActive ? "text-[#F83758]" : "text-gray-700"
          }`}
        >
          <Home size={22} className="md:h-6 md:w-6" />
          <span className="text-[10px] md:text-xs">Home</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigate("/wishlist")}
          className={`relative flex flex-col items-center gap-1 ${
            isWishlistActive ? "text-[#F83758]" : "text-gray-700"
          }`}
        >
          <div className="relative">
            <Heart size={22} className="md:h-6 md:w-6" />

            {wishlistCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </div>

          <span className="text-[10px] md:text-xs">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative flex -translate-y-4 flex-col items-center gap-1 md:-translate-y-5"
        >
          <div
            className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_0_50px_rgba(0,0,0,0.1)] md:h-14 md:w-14 ${
              isCartActive ? "bg-[#F83758]" : "bg-white"
            }`}
          >
            <ShoppingCart
              size={22}
              className={
                isCartActive ? "text-white" : "text-gray-700"
              }
            />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </button>

        {/* Search → Shop */}
        <button
          onClick={() => navigate("/shop")}
          className={`flex flex-col items-center gap-1 ${
            isShopActive ? "text-[#F83758]" : "text-gray-700"
          }`}
        >
          <Search size={22} className="md:h-6 md:w-6" />
          <span className="text-[10px] md:text-xs">Search</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center gap-1 ${
            isProfileActive ? "text-[#F83758]" : "text-gray-700"
          }`}
        >
          <Settings size={22} className="md:h-6 md:w-6" />
          <span className="text-[10px] md:text-xs">Settings</span>
        </button>

      </div>
    </nav>
  );
}