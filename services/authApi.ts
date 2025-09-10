import api from "@/lib/api";
import { ForgotPasswordPayload, LoginPayload, RegisterPayload } from "@/types/auth";


export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post("/login", payload);
    return data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post("/register", payload);
    return data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const { data } = await api.post("/forgot-password", payload);
    return data;
  },
};
