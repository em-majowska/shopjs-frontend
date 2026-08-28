"use client";
import CartItemCounter from "./CartItemCounter";
import { TProduct } from "@/types";
import { useStore } from "@/store/store";
import Link from "next/link";

type TProductDetails = {
  product: TProduct;
};

const ProductDetails = ({ product }: TProductDetails) => {
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

export default ProductDetails;
