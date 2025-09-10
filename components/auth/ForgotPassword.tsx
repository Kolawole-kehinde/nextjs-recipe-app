"use client";

import { ForgetPasswordSchema, ForgetPasswordType} from "@/Schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "@/hooks/auth/useAuth";
import CustomInput from "../CutomInput";
import { Button } from "../ui/button";

export default function ForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = (data: ForgetPasswordType) => {
    mutate({ email: data.email });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto my-20 p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <p className="text-gray-600">Enter your registered email address</p>

      
      <CustomInput
        name="email"
        control={control}
        type="email"
        placeholder="Email"
      />

      <Button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
