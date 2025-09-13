// /store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, FavoriteItem, BuyNowItem } from "@/types/cart";

interface CartState {
  cartItems: CartItem[];
  favorites: FavoriteItem[];
  buyNow: BuyNowItem | null;

  // Cart Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Favorites Actions
  toggleFavorite: (item: FavoriteItem) => void;

  // BuyNow Actions
  setBuyNow: (item: BuyNowItem | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      favorites: [],
      buyNow: null,

      addToCart: (item) =>
        set((state) => {
          const exists = state.cartItems.find((i) => i.id === item.id);
          if (exists) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),

      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.find((f) => f.id === item.id);
          return exists
            ? { favorites: state.favorites.filter((f) => f.id !== item.id) }
            : { favorites: [...state.favorites, item] };
        }),

      setBuyNow: (item) => set({ buyNow: item }),
    }),
    { name: "cart-storage" }
  )
);
