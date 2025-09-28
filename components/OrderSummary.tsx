"use client";

import { useCartCount, useCartSubtotal } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface OrderSummaryItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  subtotal?: number;
  items?: OrderSummaryItem[];
  showButton?: boolean;
  className?: string;
  buttonText?: string;
  onProceed?: () => void;
}

export default function OrderSummary({
  subtotal,
  items,
  showButton = true,
  className = "",
  buttonText = "Proceed to Checkout",
  onProceed,
}: OrderSummaryProps) {
  const subtotalValue = subtotal ?? useCartSubtotal();
  const totalQuantity =
    items?.reduce((sum, item) => sum + item.quantity, 0) ?? useCartCount();

  const router = useRouter();
  const pathname = usePathname();
  const isCheckoutPage = pathname.includes("/checkout");

  const discount = 0;
  const total = subtotalValue - discount;

  const handleProceed = () => {
    if (onProceed) {
      onProceed();
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md w-full md:w-80 ${className}`}>
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
          <span>{formatCurrency(subtotalValue)}</span>
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

      {showButton && !isCheckoutPage && (
        <div className="p-6">
          <button
            onClick={handleProceed}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-sm font-semibold"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
