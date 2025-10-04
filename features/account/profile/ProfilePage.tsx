"use client";

import { useRouter } from "next/navigation";
import { Camera, Mail, Phone, UserPen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/hooks/profile/useProfile";

const ProfilePage = () => {
  const router = useRouter();
  const { profile, changeAvatar, isUploadingAvatar, error } = useProfile();
  const [preview, setPreview] = useState<string | null>(null);

  if (!profile) {
    return (
      <div className="p-10 text-center text-red-500">
        User not found.
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // call mutation
    changeAvatar(file);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium lg:ml-8 mb-4"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-8 bg-primary text-white relative">
          {/* Avatar */}
          <div className="relative">
            <img
              src={
                preview ||
                profile.avatar ||
                `https://ui-avatars.com/api/?name=${profile.name}`
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <label className="absolute bottom-0 right-0 bg-white text-primary p-1 rounded-full cursor-pointer">
              <Camera size={18} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* User Info */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm">
              {profile.location || "No location added"}
            </p>
            <p className="text-sm">
              Joined{" "}
              {profile.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "Date unavailable"}
            </p>
            <p className="text-sm">{profile.gender || "Gender not set"}</p>
          </div>

          {/* Edit Profile */}
          <div className="md:ml-auto mt-2 md:mt-0">
            <button
              onClick={() => router.push("/profile/edit-profile")}
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary border border-white rounded-md hover:bg-opacity-90 text-sm font-medium"
            >
              <UserPen size={16} /> Edit Profile
            </button>
          </div>
        </div>

        {/* About + Contact */}
        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              About
            </h3>
            <p className="text-gray-600 text-sm">
              {profile.bio || "No bio yet."}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md border">
                <Mail className="text-primary" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md border">
                <Phone className="text-primary" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {isUploadingAvatar && (
            <p className="text-sm text-gray-500">
              Uploading profile picture...
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500">{String(error)}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
