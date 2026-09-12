import { StateCreator } from "zustand";
import { TCartSlice } from "./cartSlice";
import handleLogout from "@/actions/handleLogout";
import Cookies from "js-cookie";

export type TUserSlice = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  setAuth: (isAdmin?: boolean) => void;
  logout: () => void;
  theme: "light" | "dark";
  setTheme: () => void;
};
const getInitialTheme = () => {
  const theme = Cookies.get("theme") || "light";
  return theme;
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
      }),
    theme: getInitialTheme(),
    setTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        state.theme = newTheme;
        Cookies.set("theme", newTheme, { expires: 7 });
      }),
  };
};
