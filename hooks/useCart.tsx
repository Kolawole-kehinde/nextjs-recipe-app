import { useCartStore } from "@/store/useCartStore";

export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () => useCartStore((state) => state.removeFromCart);
export const useClearCart = () => useCartStore((state) => state.clearCart);

// ✅ Favorites
export const useFavorites = () => useCartStore((state) => state.favorites);
export const useToggleFavorite = () => useCartStore((state) => state.toggleFavorite);

// ✅ BuyNow
export const useBuyNow = () => useCartStore((state) => state.buyNow);
export const useSetBuyNow = () => useCartStore((state) => state.setBuyNow);

// ✅ Cart Count (optimized selector)
export const useCartCount = () =>
  useCartStore((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

// ✅ Favorites Count (optimized selector)
export const useFavoritesCount = () =>
  useCartStore((state) => state.favorites.length);
