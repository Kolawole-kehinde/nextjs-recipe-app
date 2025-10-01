import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "@/services/profileApi";
import { toast } from "sonner";

export function useProfile() {
  const queryClient = useQueryClient();

  // Fetch profile
  const {data: profile, isLoading,isError,error,} = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  // Update profile
  const { mutate: editProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  return {
    profile,
    isLoading,
    isError,
    error,
    editProfile,
    isUpdating,
  };
}
