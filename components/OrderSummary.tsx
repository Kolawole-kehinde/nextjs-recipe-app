"use client";

import { useCartItems, useCartSubtotal } from "@/hooks/useCart";



interface Props {
  buttonText?: string;
  onProceed?: () => void;
}

export default function OrderSummary({ buttonText = "Proceed to Checkout", onProceed }: Props) {
  const cartItems = useCartItems();
  const subtotal = useCartSubtotal();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md w-full md:w-80">
      <h2 className="text-lg font-semibold p-6 border-b">Order Summary</h2>

      <div className="px-6 py-4 space-y-2">
        <div className="flex justify-between">
          <span>Quantity</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={onProceed}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-sm font-semibold"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
