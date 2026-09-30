const API_URL = "https://dummyjson.com/products";

function formatProduct(product) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return {
    id: product.id,
    name: product.title,
    description: product.description,
    category: product.category,

    // Display values
    price: `$${discountedPrice.toFixed(2)}`,
    actualprice: `$${product.price.toFixed(2)}`,
    discount: `${Math.round(product.discountPercentage)}% OFF`,
    rating: product.rating.toFixed(1),
    image: product.thumbnail,

    // Product images
    images: product.images || [product.thumbnail],

    // Raw numeric values
    priceValue: discountedPrice,
    discountValue: product.discountPercentage,
    ratingValue: product.rating,
  };
}

export async function getProducts() {
  const response = await fetch(`${API_URL}?limit=0`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products.map(formatProduct);
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  return formatProduct(product);
}