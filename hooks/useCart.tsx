import { useCartStore } from "@/store/useCartStore";



// ✅ Cart
export const useCartItems = () =>
  useCartStore((state) => state.cartItems);
export const useAddToCart = () =>
  useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);
export const useClearCart = () =>
  useCartStore((state) => state.clearCart);

// ✅ Favorites
export const useFavorites = () =>
  useCartStore((state) => state.favorites);
export const useToggleFavorite = () =>
  useCartStore((state) => state.toggleFavorite);

// ✅ BuyNow
export const useBuyNow = () =>
  useCartStore((state) => state.buyNow);
export const useSetBuyNow = () =>
  useCartStore((state) => state.setBuyNow);
