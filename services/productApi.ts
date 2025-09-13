import api from "@/lib/api";
import { Product } from "@/types/cart";


export const productApi = {
  // ✅ Get all products
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get("/products");
    return data;
  },

  // ✅ Get single product by ID
  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
