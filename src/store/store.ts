import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { cartSlice, TCartSlice } from "./slices/cartSlice";
import { TUserSlice, userSlice } from "./slices/userSlice";

export const useStore = create<TCartSlice & TUserSlice>()(
  devtools(
    immer(
      persist((...args) => ({ ...cartSlice(...args), ...userSlice(...args) }), {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
      }),
    ),
  ),
);
