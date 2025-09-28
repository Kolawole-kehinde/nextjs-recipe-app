"use client";

import { FieldErrors, Control, UseFormHandleSubmit } from "react-hook-form";
import { CheckoutFormValues } from "@/Schema/checkoutSchema";

import CardPaymentDetails from "./CardPaymentDetails";
import PaymentMethodSelector from "./PaymentMethodSelector";
import FormInput from "./FormInput";

interface CheckoutFormProps {
  control: Control<CheckoutFormValues>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  errors: FieldErrors<CheckoutFormValues>;
  paymentMethod?: CheckoutFormValues["payment"];
  isSubmitting: boolean;
  isValid: boolean;
}

const CheckoutForm = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  paymentMethod,
  isSubmitting,
  isValid,
}: CheckoutFormProps) => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 bg-white p-6 rounded-2xl shadow-md lg:col-span-2"
  >
    <h2 className="text-xl font-semibold">Shipping Info</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <FormInput control={control} name="firstName" placeholder="First Name" error={errors.firstName} />
      <FormInput control={control} name="lastName" placeholder="Last Name" error={errors.lastName} />
    </div>
    <FormInput control={control} name="email" placeholder="Email Address" type="email" error={errors.email} />
    <FormInput control={control} name="phone" placeholder="Phone Number" type="tel" error={errors.phone} />
    <FormInput control={control} name="address" placeholder="Street Address" error={errors.address} />

    <div className="grid md:grid-cols-3 gap-4">
      <FormInput control={control} name="city" placeholder="City" error={errors.city} />
      <FormInput control={control} name="state" placeholder="State" error={errors.state} />
      <FormInput control={control} name="zip" placeholder="Zip Code" error={errors.zip} />
    </div>

    <h2 className="text-xl font-semibold">Payment</h2>
    <PaymentMethodSelector control={control} errors={errors} />

    {paymentMethod === "card" && <CardPaymentDetails control={control} errors={errors} />}

    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={`w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 ${
        !isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? "Placing Order..." : "Submit Order"}
    </button>
  </form>
);

export default CheckoutForm;
