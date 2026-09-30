import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export default function ProductApiTest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Failed to load products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-5">Loading products...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-5">
      {products.slice(0, 6).map((product) => (
        <div key={product.id} className="rounded-lg bg-white p-3 shadow">
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-cover"
          />

          <h3 className="mt-2 font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );
}