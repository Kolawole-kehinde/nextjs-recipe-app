"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormInput from "./FormInput";


type CheckoutFormValues = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

interface CardPaymentDetailsProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}

const CardPaymentDetails = ({ register, errors }: CardPaymentDetailsProps) => {
  return (
    <div className="space-y-4">
      <FormInput
        placeholder="Card Number"
        {...register("cardNumber")}
        error={errors.cardNumber}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          placeholder="Expiry (MM/YY)"
          {...register("expiry")}
          error={errors.expiry}
        />
        <FormInput placeholder="CVV" {...register("cvv")} error={errors.cvv} />
      </div>
    </div>
  );
};

export default CardPaymentDetails;
