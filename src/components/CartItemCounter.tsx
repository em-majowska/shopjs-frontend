"use client";

import { useStore } from "@/store/store";
import { TProduct } from "@/types";

type TCartItemCounter = {
  product: TProduct;
};

const CartItemCounter = ({ product }: TCartItemCounter) => {
  const addProduct = useStore((store) => store.addProduct);
  const removeProduct = useStore((store) => store.removeProduct);

  const cartItem = useStore((store) =>
    store.cart.find((item) => item._id === product._id),
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="border-border overflow-hidden rounded-2xl border">
      <button
        className="text-muted-foreground hover:bg-sand px-3 py-1 text-xl"
        onClick={(e) => {
          e.preventDefault();
          removeProduct(product._id);
        }}
      >
        -
      </button>
      <span className="px-2 py-1">{quantity}</span>
      <button
        className="text-muted-foreground hover:bg-sand px-3 py-1 text-xl transition-all"
        onClick={(e) => {
          e.preventDefault();
          addProduct(product);
        }}
      >
        +
      </button>
    </div>
  );
};

export default CartItemCounter;
