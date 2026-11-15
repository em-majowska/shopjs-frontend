import { StateCreator } from "zustand";
import { TCartSlice } from "./cartSlice";
import handleLogout from "@/actions/handleLogout";

type TTheme = "light" | "dark";

export type TUserSlice = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  setAuth: (isAdmin?: boolean) => void;
  logout: () => void;
  theme: TTheme;
  setTheme: () => void;
};
export const userSlice: StateCreator<
  TCartSlice & TUserSlice,
  [["zustand/immer", never], never],
  [],
  TUserSlice
> = (set) => {
  return {
    isAdmin: false,
    isAuthenticated: false,
    setAuth: (isAdmin?: boolean) =>
      set({ isAuthenticated: true, isAdmin: isAdmin ?? false }),
    logout: () =>
      set((state) => {
        state.isAuthenticated = false;
        state.isAdmin = false;
        handleLogout();
        state.cart = [];
      }),
    theme: "light",
    setTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        state.theme = newTheme;
      }),
  };
};
