"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutFormValues, checkoutSchema } from "@/Schema/checkoutSchema";
import OrderSummary from "@/components/OrderSummary";
import CheckoutForm from "./CheckoutForm";
import SuccessModal from "@/components/SuccessModal";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";

export default function CheckoutPage() {
  // ✅ Get cart state from zustand
  const { cartItems, buyNow, clearCart } = useCartStore();

  const items = buyNow ? [buyNow] : cartItems;
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      payment: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  // ✅ Hook only needs clearCart now
  const { placeOrder, isPending, isSuccess, orderId } = usePlaceOrder({
    clearCart,
  });

  const onSubmit = () => {
    const data = getValues();

    const shippingInfo = {
      address: data.address,
      city: data.city,
      state: data.state,
      zip_code: data.zip,
    };

    placeOrder({
      items,              // cart items
      totalPrice,         // ✅ renamed to match API
      shippingInfo,
      paymentMethod: data.payment,
    });
  };

  return (
    <main className="wrapper bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <OrderSummary
          subtotal={totalPrice}
          items={items}
          showButton={false}
          className="lg:col-span-1"
        />

        <CheckoutForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          isPending={isPending}
          isValid={isValid}
        />
      </div>

      <SuccessModal isOpen={isSuccess} onClose={() => {}} orderId={orderId} />
    </main>
  );
}
