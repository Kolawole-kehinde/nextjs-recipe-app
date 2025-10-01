import axios from "axios";
import { uploadAvatar } from "@/lib/cloudinary";

// Get user profile
export const fetchProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

// Update user profile
export const updateProfile = async (profileData: any) => {
  const { data } = await axios.put("/api/profile", profileData);
  return data;
};

// Update profile avatar
export const updateAvatar = async (file: File, userId: string) => {
  const imageUrl = await uploadAvatar(file);

  await axios.put("/api/profile", {
    id: userId,
    avatar: imageUrl,
  });

  return imageUrl;
};
