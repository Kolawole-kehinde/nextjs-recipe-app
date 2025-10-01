"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile, updateAvatar } from "@/services/profileApi";
import { toast } from "sonner";
import useUserStore from "@/store/useStore";


export function useProfile() {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  // Fetch profile
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const profile = data?.user ?? user;

  // Update profile
  const { mutate: editProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data.user); // sync zustand
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to update profile"),
  });

  // Update avatar
  const { mutate: changeAvatar, isPending: isUploadingAvatar } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (user) => {
      setUser(user); // sync zustand
      toast.success("Avatar updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to upload avatar"),
  });

  return {
    profile,
    isLoading,
    isError,
    error,
    editProfile,
    isUpdating,
    changeAvatar,
    isUploadingAvatar,
  };
}
