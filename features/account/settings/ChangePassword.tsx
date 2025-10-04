"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircle } from "lucide-react";
import { changePasswordFields } from "@/constants/auth";
import CustomButton from "@/components/CustomButton";
import { changePasswordSchema, changePasswordType } from "@/Schema/auth";
import CustomInput from "@/components/CutomInput";
import { createClient } from "@/utils/supabase/server";
import useUserStore from "@/store/useStore";


const ChangePassword = () => {

    const supabase = await createClient();
  const { user } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: changePasswordType) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (!user?.email) {
      toast.error("User not authenticated.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        toast.error("Incorrect current password.");
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        toast.error("Failed to update password.");
        return;
      }

      toast.success("Password updated successfully.");
      router.push("/account-settings"); 
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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
            <CustomInput              key={name}
              type={type}
              name={name}
              label={label}
              placeholder={placeholder}
              control={control}
              error={errors[name]}
            />
          ))}

          <CustomButton
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </CustomButton>
        </form>
      </section>
    </main>
  );
};

export default ChangePassword;
