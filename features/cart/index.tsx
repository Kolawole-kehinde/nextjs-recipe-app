"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import {
  useAddToCart,
  useCartItems,
  useCartSubtotal,
  useRemoveFromCart,
} from "@/hooks/useCart";

import OrderSummary from "@/components/OrderSummary";
import TopDishes from "@/components/LadingPage/TopDishes";
import { RecommendedDishes } from "@/components/LadingPage/RecommendedDishes";
import CartItem from "./CartItem";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartItems();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const subtotal = useCartSubtotal();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Cart Section */}
        <div className="flex-1 bg-white shadow-md rounded-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={() => router.push("/")}
              className="text-primary hover:underline"
            >
              Continue Shopping
            </button>
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <CartItem
                key={product.id}
                {...product}
                onIncrease={() =>
                  addToCart({ ...product, quantity: 1 })
                }
                onDecrease={() =>
                  product.quantity > 1
                    ? addToCart({ ...product, quantity: -1 })
                    : removeFromCart(product.id)
                }
                onRemove={() => removeFromCart(product.id)}
              />
            ))
          ) : (
            <div className="p-10 flex flex-col items-center text-center">
              <Image
                src="/images/Cart-image.png"
                alt="Empty cart"
                width={136}
                height={136}
                className="rounded-lg object-cover"
              />
              <p className="text-lg font-semibold mb-4">
                Your cart is eager to be filled!
              </p>
              <button
                onClick={() => router.push("/all-dishes")}
                className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white py-2 px-4 rounded-md transition"
              >
                Let’s start shopping! <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <OrderSummary buttonText="Proceed to Checkout" />
        )}
      </div>

      {/* Recommended Section */}
      {cartItems.length === 0 && (
        <div className="max-w-7xl mx-auto mt-10">
          <TopDishes showMoreButton={false} />
          <RecommendedDishes />
        </div>
      )}
    </div>
  );
}
