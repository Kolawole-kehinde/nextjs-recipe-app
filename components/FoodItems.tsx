"use client";

import { Heart, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";

type FoodItemProps = {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

const FoodItems = ({ id, name, price, image_url, description }: FoodItemProps) => {
  const { cartItems, addToCart, removeFromCart, toggleFavorite, isFavorite } =
    useCartContext();

  const stringId = String(id);

  const quantityInCart =
    cartItems.find((item) => item.id === stringId)?.quantity || 0;

  const product = { id: stringId, name, price, image_url, description };

  const handleToggleFavorite = () => {
    const added = toggleFavorite(product);
    if (added) {
      toast.success(`${name} added to favorites`);
    } else {
      toast(`${name} removed from favorites`, { icon: "❌" });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${name} added to cart.`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(stringId);
    toast.success(`${name} removed from cart.`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
      <div className="relative">
        <Link href={`/product-details/${stringId}`}>
          <Image
            src={image_url}
            alt={name}
            className="w-full h-48 object-cover rounded-t-xl"
            width={500}
            height={300}
          />
        </Link>

        {/* Action icons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-2">
          {/* Favorite */}
          <Heart
            onClick={handleToggleFavorite}
            className={`text-xl cursor-pointer ${
              isFavorite(stringId)
                ? "fill-red-600 stroke-red-600"
                : "text-white"
            } hover:stroke-red-600 transition`}
          />

          {/* Cart */}
          {quantityInCart === 0 ? (
            <Plus
              onClick={handleAddToCart}
              className="text-primary text-xl cursor-pointer bg-white rounded-full p-1 hover:scale-110 transition"
              title="Add to cart"
            />
          ) : (
            <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md">
              <Minus
                onClick={handleRemoveFromCart}
                className="w-6 h-6 text-red-600 cursor-pointer hover:scale-110 transition"
                title="Remove item"
              />
              <p className="text-sm font-medium">{quantityInCart}</p>
              <Plus
                onClick={handleAddToCart}
                className="w-6 h-6 text-green-600 cursor-pointer hover:scale-110 transition"
                title="Add item"
              />
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Image
            src="/images/rating_starts.png"
            alt="Rating stars"
            className="w-16 h-auto"
            width={64}
            height={16}
          />
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-primary font-bold">${price}</p>
      </div>
    </div>
  );
};

export default FoodItems;
