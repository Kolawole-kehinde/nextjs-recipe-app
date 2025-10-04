import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/store/useStore";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function useChangePassword() {
     const supabase = createClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }: ChangePassword) => {
      if (!user?.email) throw new Error("User not authenticated.");
      if (newPassword !== confirmPassword) throw new Error("New passwords do not match.");

      // Re-authenticate
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (signInError) throw new Error("Incorrect current password.");

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw new Error("Failed to update password.");

      return true;
    },
    onSuccess: () => {
      toast.success("Password updated successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong.");
    },
  });
}
