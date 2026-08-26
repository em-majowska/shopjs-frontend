import { StateCreator } from "zustand";
import { TCartSlice } from "./cartSlice";
import handleLogout from "@/actions/handleLogout";

export type TUserSlice = {
  isAdmin: boolean;
  isAuthenticated: boolean;
  setAuth: (isAdmin?: boolean) => void;
  logout: () => void;
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
  };
};
