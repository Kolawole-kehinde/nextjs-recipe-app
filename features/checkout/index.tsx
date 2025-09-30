"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutFormValues, checkoutSchema } from "@/Schema/checkoutSchema";
import OrderSummary from "@/components/OrderSummary";
import CheckoutForm from "./CheckoutForm";
import SuccessModal from "@/components/SuccessModal";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";

export default function CheckoutPage() {
  const { cartItems, buyNow, clearCart } = useCartStore();

  // ✅ fallback to array
  const itemsRaw = buyNow ? [buyNow] : cartItems || [];

  // ✅ map to OrderItemPayload
  const items = itemsRaw.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
      payment: undefined,
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const { placeOrder, isPending, isSuccess, orderId } = usePlaceOrder({ clearCart });

  const onSubmit = (data: CheckoutFormValues) => {
    const shippingInfo = {
      address: data.address,
      city: data.city,
      state: data.state,
      zip_code: data.zip,
      phone: data.phone,
    };

    // ✅ payload now matches API
    placeOrder({
      items,
      totalPrice,
      shippingInfo,
      paymentMethod: data.payment,
    });
  };

  const paymentMethod = watch("payment");

  return (
    <main className="wrapper bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        <OrderSummary
          subtotal={totalPrice}
          items={itemsRaw}
          showButton={false}
          className="lg:col-span-1"
        />

        <CheckoutForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          paymentMethod={paymentMethod}
          isSubmitting={isPending}
          isValid={isValid}
        />
      </div>

      <SuccessModal isOpen={isSuccess} onClose={() => {}} orderId={orderId} />
    </main>
  );
}
