import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/login", payload);
      return data;
    },
  });
}
