"use client";

import { useCartCount, useCartItems, useCartSubtotal } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";


const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function OrderSummary({
  buttonText = "Proceed to Checkout",
}: {
  buttonText?: string;
}) {
  const cartItems = useCartItems();
  const subtotal = useCartSubtotal();
  const totalQuantity = useCartCount();

  const router = useRouter();
  const pathname = usePathname();
  const isCheckoutPage = pathname.includes("/checkout");

  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="bg-white rounded-xl shadow-md w-full md:w-80">
      <h2 className="text-lg font-semibold p-6 mb-4 border-b-2 border-gray-200">
        Order Summary
      </h2>

      <div className="text-base font-medium">
        <div className="flex justify-between p-6 border-b-2 border-gray-200">
          <span>Quantity:</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="flex justify-between p-6 border-b-2 border-gray-200">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between p-6 border-b-2 border-gray-200">
          <span>Discount:</span>
          <span>{formatCurrency(discount)}</span>
        </div>
        <div className="flex justify-between p-6 border-b-2 border-gray-200 font-semibold text-lg">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {!isCheckoutPage && (
        <div className="p-6">
          <button
            onClick={() => router.push("/checkout")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-sm font-semibold"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
