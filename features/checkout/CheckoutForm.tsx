"use client";

import { FieldErrors, Control, UseFormHandleSubmit } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CheckoutFormValues } from "@/types/checkout";
import FormInput from "./FormInput";
import PaymentMethodSelector from "./PaymentMethodSelector";
import CardPaymentDetails from "./CardPaymentDetails";

interface CheckoutFormProps {
  control: Control<CheckoutFormValues>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormValues>;
  onSubmit: (data: CheckoutFormValues) => void;
  errors: FieldErrors<CheckoutFormValues>;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  isLoading: boolean;
  isValid: boolean;
}

const CheckoutForm = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  paymentMethod,
  setPaymentMethod,
  isLoading,
  isValid,
}: CheckoutFormProps) => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 bg-white p-6 rounded-2xl shadow-md lg:col-span-2"
  >
    <h2 className="text-xl font-semibold">Shipping Info</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="First Name" {...field} error={errors.firstName} />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="Last Name" {...field} error={errors.lastName} />
        )}
      />
    </div>

    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <FormInput placeholder="Email Address" {...field} error={errors.email} />
      )}
    />
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <FormInput placeholder="Phone Number" {...field} error={errors.phone} />
      )}
    />
    <Controller
      name="address"
      control={control}
      render={({ field }) => (
        <FormInput placeholder="Street Address" {...field} error={errors.address} />
      )}
    />
    <div className="grid md:grid-cols-3 gap-4">
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="City" {...field} error={errors.city} />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="State" {...field} error={errors.state} />
        )}
      />
      <Controller
        name="zip"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="Zip Code" {...field} error={errors.zip} />
        )}
      />
    </div>

    <h2 className="text-xl font-semibold">Payment</h2>
    <PaymentMethodSelector
      control={control}
      setPaymentMethod={setPaymentMethod}
      errors={errors}
    />

    {paymentMethod === "card" && (
      <CardPaymentDetails control={control} errors={errors} />
    )}

    <button
      type="submit"
      disabled={!isValid || isLoading}
      className={`w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 ${
        !isValid || isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Placing Order..." : "Submit Order"}
    </button>
  </form>
);

export default CheckoutForm;
