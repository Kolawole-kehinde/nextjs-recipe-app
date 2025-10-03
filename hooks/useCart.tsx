import { useCartStore } from "@/store/useCartStore";


// Cart
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () => useCartStore((state) => state.removeFromCart);
export const useClearCart = () => useCartStore((state) => state.clearCart);

// Wishlist
export const useWishlist = () => useCartStore((state) => state.wishlists);
export const useToggleWishlist = () => useCartStore((state) => state.toggleWishlist);

// BuyNow
export const useBuyNow = () => useCartStore((state) => state.buyNow);
export const useSetBuyNow = () => useCartStore((state) => state.setBuyNow);

// Derived values
export const useCartCount = () =>
  useCartStore((state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0));

export const useWishlistCount = () =>
  useCartStore((state) => state.wishlists.length);

export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
