"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useController, Control } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomInput({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className = "w-full p-2 border rounded",
  disabled,
}: CustomInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [openPassword, setOpenPassword] = useState(false);

  return (
    <fieldset className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={openPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          className={`${className} pr-10`}
          disabled={disabled}
          {...field}
        />
        {type === "password" && (
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setOpenPassword((prev) => !prev)}
          >
            {openPassword ? <Eye /> : <EyeOff />}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </fieldset>
  );
}
