import { useCartStore } from "@/store/useCartStore";

export function useCart() {
  const {
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
  } = useCartStore();

  return {
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
  };
}
