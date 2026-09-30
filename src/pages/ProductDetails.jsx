import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import ProductCard from "../components/ProductCard";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../api/products";
import {
  ArrowLeft,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  MapPin,
  ShieldCheck,
  RotateCcw,
  User,
  Eye,
  Tags,
  SlidersHorizontal,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCurrentImageIndex(0);
    setShowMore(false);

    Promise.all([getProductById(id), getProducts()])
      .then(([productData, allProducts]) => {
        setProduct(productData);

        const similar = allProducts
          .filter(
            (item) =>
              String(item.id) !== String(productData.id) &&
              item.category === productData.category
          )
          .slice(0, 4);

        setSimilarProducts(similar);
      })
      .catch((error) => {
        console.error("Failed to load product:", error);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Product not found</p>

        <button
          onClick={() => navigate("/shop")}
          className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const details = product.description;

  const rating = Number(product.ratingValue ?? product.rating ?? 0);
  const fullStars = Math.round(rating);

  const productImages =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const currentImage =
    productImages[currentImageIndex] || product.image;

  const hasMultipleImages = productImages.length > 1;

  const handleNextImage = () => {
    if (!hasMultipleImages) return;

    setCurrentImageIndex(
      (currentIndex) =>
        (currentIndex + 1) % productImages.length
    );
  };

  const handlePreviousImage = () => {
    if (!hasMultipleImages) return;

    setCurrentImageIndex(
      (currentIndex) =>
        (currentIndex - 1 + productImages.length) %
        productImages.length
    );
  };

  const handleSelectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pb-24 text-gray-900">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-6 lg:px-10">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={27} strokeWidth={1.8} />
        </button>

        <h1 className="hidden text-xl font-semibold md:block">
          Product Details
        </h1>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
          onClick={() => navigate("/cart")}
          aria-label="Go to cart"
        >
          <ShoppingCart size={18} strokeWidth={1.8} />
        </button>
      </header>

      {/* Main Product Area */}
      <main className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <section className="md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] lg:gap-12">
          {/* Product Gallery */}
          <div>
            <div className="relative">
              <div className="h-72 overflow-hidden rounded-2xl bg-gray-100 sm:h-80 md:h-110 lg:h-130">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white md:h-11 md:w-11"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white md:h-11 md:w-11"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Desktop Image Thumbnails */}
            {hasMultipleImages && (
              <div className="mt-4 hidden gap-3 overflow-x-auto md:flex">
                {productImages.map((image, index) => (
                  <button
                    key={image + index}
                    onClick={() => handleSelectImage(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                      index === currentImageIndex
                        ? "border-[#F83758]"
                        : "border-transparent"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Image Indicators */}
            {hasMultipleImages && (
              <div className="mt-4 flex justify-center gap-2 md:hidden">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-5 bg-red-400"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Summary */}
          <div className="pt-6 md:flex md:flex-col md:justify-center md:pt-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {product.category}
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg tracking-wide text-yellow-500">
                {"★".repeat(fullStars)}
                <span className="text-gray-300">
                  {"★".repeat(5 - fullStars)}
                </span>
              </span>

              <span className="text-sm text-gray-500">
                {rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.price}
              </span>

              <span className="text-sm text-gray-300 line-through">
                {product.actualprice}
              </span>

              <span className="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-400">
                {product.discount}
              </span>
            </div>

            {/* Description */}
            <div className="mt-5">
              <p className="text-sm leading-6 text-gray-500 md:text-base">
                {showMore || details.length <= 220
                  ? details
                  : `${details.slice(0, 220)}...`}

                {details.length > 220 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="ml-1 font-medium text-red-400"
                  >
                    {showMore ? "Less" : "More"}
                  </button>
                )}
              </p>
            </div>

            {/* Feature Buttons */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
              <button className="flex min-w-fit items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600">
                <MapPin size={16} />
                Nearest Store
              </button>

              <button className="flex min-w-fit items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600">
                <ShieldCheck size={16} />
                VIP
              </button>

              <button className="flex min-w-fit items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600">
                <RotateCcw size={16} />
                Return policy
              </button>
            </div>

            {/* Cart / Buy Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                <ShoppingCart size={20} />
                Go to cart
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { product },
                  })
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-green-400 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-500"
              >
                <User size={20} />
                Buy Now
              </button>
            </div>

            {/* Delivery */}
            <div className="mt-5 rounded-lg bg-[#FFCCD5] px-5 py-4">
              <p className="text-base font-semibold">
                Delivery in
              </p>

              <p className="mt-1 text-xl font-bold">
                1 within Hour
              </p>
            </div>
          </div>
        </section>

        {/* Desktop Product Details */}
        <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm md:mt-12 md:p-7 lg:p-8">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
            Product Details
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-gray-500 md:text-base">
            {details}
          </p>
        </section>

        {/* Similar / Compare */}
        <section className="mt-6 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Eye size={20} />
            View Similar
          </button>

          <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tags size={20} />
            Add to Compare
          </button>
        </section>

        {/* Similar Products Heading */}
        <section className="pt-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Similar To
              </p>

              <h2 className="text-2xl font-bold text-gray-900">
                {similarProducts.length}+ Items
              </h2>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-sm">
                Sort
                <SlidersHorizontal size={17} />
              </button>

              <button className="flex items-center gap-1 text-sm">
                Filter
                <SlidersHorizontal size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {similarProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>

          {similarProducts.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              No similar products found.
            </p>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}