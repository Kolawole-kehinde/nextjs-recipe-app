import api from "@/lib/api";

export const productApi = {
  getAll: async () => {
    const { data } = await api.get("/products");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
