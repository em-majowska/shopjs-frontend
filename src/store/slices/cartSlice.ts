import { TCartItem, TProduct } from "@/types";
import { StateCreator } from "zustand";
import { TUserSlice } from "./userSlice";

export type TCartSlice = {
  cart: TCartItem[];
  getTotal: () => number;
  addProduct: (product: TProduct, quantity?: number) => void;
  removeProduct: (id: string) => void;
  emptyCart: () => void;
};

export const cartSlice: StateCreator<
  TCartSlice & TUserSlice,
  [["zustand/immer", never], never],
  [],
  TCartSlice
> = (set, get) => {
  return {
    cart: [],
    getTotal: () => {
      return get().cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    addProduct: (product, quantity = 1) => {
      set((state) => {
        const index = state.cart.findIndex((item) => item._id === product._id);

        if (index !== -1) {
          state.cart[index].quantity += quantity;
        } else {
          state.cart.push({ ...product, quantity });
        }
      });
    },

    removeProduct: (id) => {
      set((state) => {
        const index = state.cart.findIndex((p) => p._id === id);

        if (index !== -1) {
          if (state.cart[index].quantity > 1) {
            state.cart[index].quantity--;
          } else {
            state.cart.splice(index, 1);
          }
        }
      });
    },
    emptyCart: () =>
      set({
        cart: [],
      }),
  };
};
