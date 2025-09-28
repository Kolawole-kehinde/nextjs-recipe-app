"use client";

import React from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: FieldError;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ placeholder, error, ...rest }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...rest}
        />
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput"; 

export default FormInput;
