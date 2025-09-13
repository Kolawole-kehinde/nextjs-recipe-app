"use client";
import LocalStorageService from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import toast from "react-hot-toast";

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: any; // allows extra fields like image, category, etc.
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  buyNowItem: CartItem | null;
  buyNow: (product: Product, quantity?: number) => void;
  clearBuyNow: () => void;
  favorites: Product[];
  toggleFavorite: (product: Product) => boolean;
  isFavorite: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Helpers
  const saveToLocalStorage = useCallback((key: string, value: any) => {
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      LocalStorageService.setItem(key, value);
    } else {
      LocalStorageService.removeItem(key);
    }
  }, []);

  const loadFromLocalStorage = useCallback((key: string) => {
    return LocalStorageService.getItem(key);
  }, []);

  // Load on mount
  useEffect(() => {
    setCartItems(loadFromLocalStorage("cart") || []);
    setBuyNowItem(loadFromLocalStorage("buyNow") || null);
    setFavorites(loadFromLocalStorage("favorites") || []);
  }, [loadFromLocalStorage]);

  // Persist changes
  useEffect(() => saveToLocalStorage("cart", cartItems), [cartItems, saveToLocalStorage]);
  useEffect(() => saveToLocalStorage("buyNow", buyNowItem), [buyNowItem, saveToLocalStorage]);
  useEffect(() => saveToLocalStorage("favorites", favorites), [favorites, saveToLocalStorage]);

  // Cart Functions
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Updated quantity of ${product.name} in cart.`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Item removed from cart.");
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    LocalStorageService.removeItem("cart");
    toast.success("Cart cleared!");
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Buy Now
  const buyNow = useCallback((product: Product, quantity = 1) => {
    setBuyNowItem({ ...product, quantity });
  }, []);

  const clearBuyNow = useCallback(() => {
    setBuyNowItem(null);
    LocalStorageService.removeItem("buyNow");
  }, []);

  // Favorites
  const toggleFavorite = useCallback(
    (product: Product) => {
      const exists = favorites.some((fav) => fav.id === product.id);
      const updated = exists
        ? favorites.filter((fav) => fav.id !== product.id)
        : [...favorites, product];

      setFavorites(updated);
      toast.success(
        exists ? `${product.name} removed from favorites.` : `${product.name} added to favorites.`
      );
      return !exists;
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.some((fav) => fav.id === productId),
    [favorites]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        buyNowItem,
        buyNow,
        clearBuyNow,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};
