import api from "@/lib/api";


export const authApi = {
  login: async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/login", payload);
    return data;
  },

  register: async (payload: { name: string; email: string; gender: string; password: string }) => {
    const { data } = await api.post("/register", payload);
    return data;
  },

  forgotPassword: async (payload: { email: string }) => {
    const { data } = await api.post("/forgot-password", payload);
    return data;
  },
};
