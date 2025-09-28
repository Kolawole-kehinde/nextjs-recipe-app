"use client";

import { CheckoutFormValues } from "@/Schema/checkoutSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface PaymentMethodSelectorProps {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const PaymentMethodSelector = ({ control, errors }: PaymentMethodSelectorProps) => {
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
                onChange={(e) => field.onChange(e.target.value)}
                className="h-4 w-4 text-orange-600"
              />
              Credit / Debit Card
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="paypal"
                checked={field.value === "paypal"}
                onChange={(e) => field.onChange(e.target.value)}
                className="h-4 w-4 text-orange-600"
              />
              PayPal
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={field.value === "cod"}
                onChange={(e) => field.onChange(e.target.value)}
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
