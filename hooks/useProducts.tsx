"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });
};
