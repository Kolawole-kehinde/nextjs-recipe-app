
import api from "@/lib/api";
export const productApi = {
  getAll: async () => {
    const { data } = await api.get("/products");
    return data;
  },
};
