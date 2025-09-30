// /store/userStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "@/types/auth";
import { useCartStore } from "./useCartStore";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: null,
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      logout: () => {
        set((state) => {
          state.user = null;
        });

        // 👇 clear cart when user logs out
        useCartStore.getState().clearCart();
      },
    })),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
