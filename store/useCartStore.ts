// /store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, WishlistItem, BuyNowItem } from "@/types/cart";

interface CartState {
  cartItems: CartItem[];
  wishlists: WishlistItem[];
  buyNow: BuyNowItem | null;

  // Cart Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Wishlist Actions
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;

  // BuyNow Actions
  setBuyNow: (item: BuyNowItem | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlists: [],
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

      toggleWishlist: (item) =>
        set((state) => {
          const exists = state.wishlists.find((f) => f.id === item.id);
          return exists
            ? { wishlists: state.wishlists.filter((f) => f.id !== item.id) }
            : { wishlists: [...state.wishlists, item] };
        }),

      clearWishlist: () => set({ wishlists: [] }),
      
      setBuyNow: (item) => set({ buyNow: item }),
    }),
    { name: "cart-storage" }
  )
);
