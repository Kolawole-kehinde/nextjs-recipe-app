import React from "react";

type ButtonType = "submit" | "reset" | "button";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type = "submit",
  disabled = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}
      className={`w-full text-white py-2 px-4 rounded-md transition-colors 
        ${disabled ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
