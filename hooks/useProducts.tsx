"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/services/productApi";
import { toast } from "sonner";
import { Product } from "@/types/cart";


// ✅ Fetch all products
export const useProducts = () => {
  return useQuery<Product[], Error>({
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

// ✅ Fetch single product by ID
export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await productApi.getById(id);
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch product");
        throw err;
      }
    },
    enabled: !!id,
  });
};
