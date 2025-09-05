import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

 export function useRegister() {
   return useMutation ({
    mutationFn: async (payload: RegisterPayload) => {
        const {data} = await api.post("/register", payload);
        return data;
    }
   })
 };