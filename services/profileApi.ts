import { uploadToCloudinary } from "@/lib/cloudinary";
import axios from "axios";


// Fetch current logged-in user
export const fetchProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

// Update current logged-in user
export const updateProfile = async (profileData: any) => {
  const { data } = await axios.put("/api/profile", profileData);
  return data;
};

// Upload avatar + update profile
export const updateAvatar = async (file: File) => {
  const imageUrl = await uploadToCloudinary(file);
  const { data } = await axios.put("/api/profile", { avatar: imageUrl });
  return data.user;
};
