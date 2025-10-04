"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle } from "lucide-react";
import { changePasswordFields } from "@/constants/auth";
import CustomButton from "@/components/CustomButton";
import { changePasswordSchema, changePasswordType } from "@/Schema/auth";
import { useChangePassword } from "@/features/auth/hook/useChangePassword";
import CustomInput from "@/components/CutomInput";


const ChangePassword = () => {
  const router = useRouter();

 const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<changePasswordType>({
  resolver: zodResolver(changePasswordSchema),
});

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data: changePasswordType) => {
    changePassword(data, {
      onSuccess: () => {
        router.push("/account-settings");
      },
    });
  };

  return (
    <main className="h-auto bg-gray-100 p-6 md:p-10">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium md:ml-8 mb-4"
      >
        <ArrowLeftCircle size={20} /> Back
      </button>

      {/* Form Card */}
      <section className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>

       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  {changePasswordFields.map(({ type, name, label, placeholder }) => (
    <CustomInput
      key={name}
      type={type}
      name={name}
      label={label}
      placeholder={placeholder}
      control={control}  
      error={errors}
    />
  ))}

          <CustomButton
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            {isPending ? "Updating..." : "Update Password"}
          </CustomButton>
        </form>
      </section>
    </main>
  );
};

export default ChangePassword;
