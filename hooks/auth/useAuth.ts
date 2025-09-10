import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { toast } from "sonner";


export const authKeys = {
  user: () => ["auth", "user"],
  session: () => ["auth", "session"],
};

// 🔹 Login Hook
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Invalid credentials");
    },
  });
}

// 🔹 Register Hook
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Registration failed");
    },
  });
}

// 🔹 Forgot Password Hook
export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Something went wrong");
    },
  });
}

// Reset Password Hook

export function useResetPassword() {
  const route = useRouter();
   return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      route.push("/auth/password-success");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  });
}
