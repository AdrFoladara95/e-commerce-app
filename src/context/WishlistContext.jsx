import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

const getWishlistKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.email) {
    return null;
  }

  return `wishlist_${user.email.trim().toLowerCase()}`;
};

const getSavedWishlist = () => {
  const wishlistKey = getWishlistKey();

  if (!wishlistKey) {
    return [];
  }

  const savedWishlist = localStorage.getItem(wishlistKey);

  if (!savedWishlist) {
    return [];
  }

  try {
    return JSON.parse(savedWishlist);
  } catch {
    return [];
  }
};

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] =
    useState(getSavedWishlist);

  useEffect(() => {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) {
      return;
    }

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const reloadWishlist = () => {
    setWishlistItems(getSavedWishlist());
  };

  const addToWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        reloadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}