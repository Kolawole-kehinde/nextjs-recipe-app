import { AppContext } from "@/context/AppContextProvider";
import { useContext } from "react";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  handleLogout: () => Promise<void>;
  loading: boolean;
}

// ✅ Correct way
export const useAuth = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAuth must be used within an AppContextProvider");
  }

  return context;
};
