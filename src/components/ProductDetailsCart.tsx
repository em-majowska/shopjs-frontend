"use client";
import CartItemCounter from "./CartItemCounter";
import { TProduct } from "@/types";
import { useStore } from "@/store/store";
import Link from "next/link";

type TProductDetailsCart = {
  product: TProduct;
};

const ProductDetailsCart = ({ product }: TProductDetailsCart) => {
  const cartItem = useStore((store) =>
    store.cart.find((item) => item._id === product._id),
  );
  return (
    <div className="flex h-11.25 justify-between">
      <CartItemCounter product={product} />
      {cartItem && (
        <Link href="/cart" className="btn-outline fade-up">
          Voir le panier
        </Link>
      )}
    </div>
  );
};

export default ProductDetailsCart;
