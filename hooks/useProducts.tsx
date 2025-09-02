"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await api.get("/products");
        console.log("API raw response:", response.data);

        // Ensure it's always an array
        if (Array.isArray(response.data)) {
          return response.data;
        }

        // If API returns { data: [...] }
        if (response.data?.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }

        return [];
      } catch (err: any) {
        console.error("API fetch error:", err);
        toast.error(err.response?.data?.error || "❌ Failed to fetch products");
        throw err;
      }
    },
  });
};
