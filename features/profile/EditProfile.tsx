"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomButton from "@/components/CustomButton";
import { ArrowLeft } from "lucide-react";
import useUserStore from "@/store/useStore";
import { useProfile } from "@/hooks/profile/useProfile";
import { editProfileInputs } from "@/constants/editProfileInputs";
import CustomInput from "@/components/CutomInput";

const EditProfile = () => {
  const router = useRouter();
  const { profile, editProfile, isUpdating } = useProfile();
  const { setUser } = useUserStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    editProfile(formData, {
      onSuccess: (data) => {
        setUser(data.user);
        toast.success("Profile updated successfully!");
        router.push("/profile");
      },
      onError: () => {
        toast.error("Update failed. Please try again.");
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium lg:ml-8 mb-4"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {editProfileInputs.map(
            ({ label, name, type, placeholder, disabled }) =>
              type === "textarea" ? (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <textarea
                    name={name}
                    value={formData[name as keyof typeof formData] || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={placeholder}
                  />
                </div>
              ) : (
                <CustomInput
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name as keyof typeof formData] || ""}
                  onChange={handleChange}
                  placeholder={placeholder}
                  disabled={disabled}
                />
              )
          )}

          <CustomButton
            type="submit"
            disabled={isUpdating}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
          >
            {isUpdating ? "Saving..." : "Update Profile"}
          </CustomButton>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
