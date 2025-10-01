"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "@/hooks/profile/useProfile";
import useUserStore from "@/store/useStore";
import CustomButton from "@/components/CustomButton";
import { editProfileInputs } from "@/constants/editProfileInputs";
import { ProfileFormValues, profileSchema } from "@/Schema/profileSchema";
import CustomInput from "@/components/CutomInput";

const EditProfile = () => {
  const router = useRouter();
  const { profile, editProfile, isUpdating } = useProfile();
  const { setUser } = useUserStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      location: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        location: profile.location || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    editProfile(data, {
      onSuccess: (res) => {
        setUser(res.user);
        toast.success("Profile updated successfully!");
        router.push("/profile");
      },
      onError: () => toast.error("Update failed. Please try again."),
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium lg:ml-8 mb-4"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {editProfileInputs.map(({ label, name, type, placeholder, disabled }) =>
            type === "textarea" ? (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <textarea
                  {...(control.register && (control as any).register(name))}
                  rows={4}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ) : (
              <CustomInput
                key={name}
                name={name}
                control={control}
                label={label}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
              />
            )
          )}

          <CustomButton
            type="submit"
            disabled={isUpdating || isSubmitting}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            {isUpdating || isSubmitting ? "Saving..." : "Update Profile"}
          </CustomButton>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
