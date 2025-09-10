"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import { ResetPasswordSchema, ResetType} from "@/Schema/auth";
import CustomInput from "../CutomInput";



export default function ResetPasswordPage() {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetType> = (data) => {
    resetPassword(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">Reset Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          type="password"
          name="password"
          placeholder="New Password"
          control={control}
        />
     

        <CustomInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          control={control}
        />
     

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
