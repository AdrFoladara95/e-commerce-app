import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const saved = isInWishlist(product.id);
  const rating = Number(product.ratingValue ?? product.rating ?? 0);
  const fullStars = Math.round(rating);

  return (
    <div
      onClick={() => navigate(`/product-details/${product.id}`)}
      className="min-w-40 overflow-hidden rounded-lg bg-white shadow-sm"
    >
      <div className="relative h-42.5 w-full bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <button
          onClick={handleWishlist}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart
            size={19}
            className={
              saved
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {product.description}
        </p>

        <span className="text-sm font-bold text-gray-900">
          {product.price}
        </span>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-300 line-through">
            {product.actualprice}
          </span>

          <span className="text-xs text-red-500">
            {product.discount}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1">
          <span className="text-yellow-400">
            {"★".repeat(fullStars)}
            <span className="text-gray-300">
              {"★".repeat(5 - fullStars)}
            </span>
          </span>

          <span className="text-xs text-gray-500">
            {rating.toFixed(1)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-2 text-xs font-medium text-white transition hover:bg-indigo-600"
        >
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}