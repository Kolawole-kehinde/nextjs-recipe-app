
export interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  onRemove?: () => void;
  onAddToCart?: () => void;
  isInWishlist?: boolean;
}
