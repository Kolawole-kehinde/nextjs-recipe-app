import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import type { Product, CartItem } from "@/types/cart";

interface CartState {
  cartItems: CartItem[];
  buyNowItem: CartItem | null;
  favorites: Product[];

  // Cart
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;

  // Buy Now
  buyNow: (product: Product, quantity?: number) => void;
  clearBuyNow: () => void;

  // Favorites
  toggleFavorite: (product: Product) => boolean;
  isFavorite: (productId: string) => boolean;
}

// Zustand Store with localStorage persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      buyNowItem: null,
      favorites: [],

      // 🔹 Cart logic
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === product.id);
          if (existing) {
            toast.success(`Updated quantity of ${product.name} in cart.`);
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity }],
          };
        });
      },

      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cartItems: [] }),

      getTotalPrice: () =>
        get().cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),

      // 🔹 Buy Now logic
      buyNow: (product, quantity = 1) =>
        set({ buyNowItem: { ...product, quantity } }),

      clearBuyNow: () => set({ buyNowItem: null }),

      // 🔹 Favorites logic
      toggleFavorite: (product) => {
        const exists = get().favorites.some((fav) => fav.id === product.id);
        if (exists) {
          set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id !== product.id),
          }));
          return false; // removed
        } else {
          set((state) => ({
            favorites: [...state.favorites, product],
          }));
          return true; // added
        }
      },

      isFavorite: (productId) =>
        get().favorites.some((fav) => fav.id === productId),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
