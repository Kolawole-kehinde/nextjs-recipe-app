import axios from "axios";

const API_URL = "/api/profile";

// Get user profile
export const fetchProfile = async () => {
  const { data } = await axios.get("/profile");
  return data;
};

// Update user profile
export const updateProfile = async (profileData: any) => {
  const { data } = await axios.put("/profile", profileData);
  return data;
};
