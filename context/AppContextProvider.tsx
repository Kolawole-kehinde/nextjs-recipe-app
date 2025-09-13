"use client";

import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LocalStorageService from "@/utils/localStorage";
import { createClient } from "@/utils/supabase/client";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  [key: string]: any;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  handleLogout: () => Promise<void>;
  loading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const supabase = createClient();

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { getItem, setItem, clear } = LocalStorageService;

  const [user, setUser] = useState<User | null>(() =>
    typeof window !== "undefined" ? getItem("auth") : null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        toast.error("Failed to fetch products");
        console.error("Supabase error:", error.message);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      clear();
      router.push("/auth/login");
      toast.success("Logged out successfully");
    } catch (err: any) {
      toast.error(err?.message ?? "Logout failed");
    } finally {
      setLoading(false);
    }
  }, [router, clear]);

  return (
    <AppContext.Provider value={{ user, setUser, products, handleLogout, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
};
