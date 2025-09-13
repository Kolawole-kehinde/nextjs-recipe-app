import api from "@/lib/api";
import { ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload } from "@/types/auth";


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

  resetPassword: async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/reset-password", payload);
  return data;
},

logout: async () => {
  const {data} = await api.post("/logout");
  return data;
}
};

