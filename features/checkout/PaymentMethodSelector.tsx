"use client";

import { CheckoutFormValues } from "@/Schema/checkoutSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";


const PaymentMethodSelector = ({
  control,
  setPaymentMethod,
  errors,
}: {
  control: Control<CheckoutFormValues>;
  setPaymentMethod: (value: CheckoutFormValues["payment"]) => void;
  errors: FieldErrors<CheckoutFormValues>;
}) => {
  return (
    <div className="space-y-4">
      <Controller
        name="payment"
        control={control}
        render={({ field }) => (
          <>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="card"
                checked={field.value === "card"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setPaymentMethod(e.target.value as CheckoutFormValues["payment"]);
                }}
                className="h-4 w-4 text-orange-600"
              />
              Credit / Debit Card
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="paypal"
                checked={field.value === "paypal"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setPaymentMethod(e.target.value as CheckoutFormValues["payment"]);
                }}
                className="h-4 w-4 text-orange-600"
              />
              PayPal
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={field.value === "cod"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setPaymentMethod(e.target.value as CheckoutFormValues["payment"]);
                }}
                className="h-4 w-4 text-orange-600"
              />
              Cash on Delivery
            </label>
          </>
        )}
      />

      {errors.payment && (
        <p className="text-sm text-red-500">{errors.payment.message}</p>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
