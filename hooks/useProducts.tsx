import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/services/productApi";
import { toast } from "sonner";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await productApi.getAll();
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch products");
        throw err;
      }
    },
  });
};
