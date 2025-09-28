"use client";

import { Control, FieldErrors } from "react-hook-form";
import { CheckoutFormValues } from "@/Schema/checkoutSchema";
import FormInput from "./FormInput";

interface CardPaymentDetailsProps {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const CardPaymentDetails = ({ control, errors }: CardPaymentDetailsProps) => (
  <div className="space-y-4">
    <FormInput control={control} name="cardNumber" placeholder="Card Number" type="number" error={errors.cardNumber} />
    <div className="grid grid-cols-2 gap-4">
      <FormInput control={control} name="expiry" placeholder="Expiry (MM/YY)" error={errors.expiry} />
      <FormInput control={control} name="cvv" placeholder="CVV" type="number" error={errors.cvv} />
    </div>
  </div>
);

export default CardPaymentDetails;
