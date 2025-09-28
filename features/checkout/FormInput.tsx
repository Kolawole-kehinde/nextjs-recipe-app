"use client";

import { Controller, Control, FieldError } from "react-hook-form";
import { CheckoutFormValues } from "@/Schema/checkoutSchema";

interface FormInputProps {
  control: Control<CheckoutFormValues>;
  name: keyof CheckoutFormValues;
  placeholder: string;
  type?: string;
  error?: FieldError;
}

const FormInput = ({
  control,
  name,
  placeholder,
  type = "text",
  error,
}: FormInputProps) => (
  <div className="space-y-1">
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
        />
      )}
    />
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);

export default FormInput;
