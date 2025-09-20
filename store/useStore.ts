import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "@/types/auth";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useStore = create<UserState>()(
  persist(
    immer((set) => ({
      user: null,
      setUser: (user) => {
        set((state) => {
          state.user = {
            id: user.id,
            email: user.email,
            name: user.name ?? null,
            avatar: user.avatar ?? null,
            gender: user.gender ?? null,
          };
        });
      },
      logout: () => {
        set((state) => {
          state.user = null;
        });
      },
    })),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
