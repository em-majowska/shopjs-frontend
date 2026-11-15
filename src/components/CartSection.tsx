"use client";

import { useStore } from "@/store/store";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import CartItemElement from "./CartItem";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsTrash2 } from "react-icons/bs";

const CartSection = () => {
  const cart = useStore((store) => store.cart);
  const total = useStore((store) => store.getTotalLocale());
  const emptyCart = useStore((store) => store.emptyCart);
  const isEmpty = cart.length === 0;

  return isEmpty ? (
    <section className="fade-up flex items-center justify-center">
      <div className="bg-card border-border mx-auto flex flex-col items-center justify-center gap-6 rounded-2xl border p-15">
        <LuShoppingBag className="text-rose-foreground size-10" />
        <p className="font-display text-2xl font-medium">
          Votre panier est vide
        </p>
        <p className="text-muted-foreground">
          Parcourez la boutique et laissez-vous guider par nos soins les plus
          délicats.
        </p>
        <Link href="/products" className="btn-primary">
          Découvrir les produits
        </Link>
      </div>
    </section>
  ) : (
    <div className="fade-up flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      <section className="bg-card border-border shadow-lift flex flex-3 flex-col gap-4 rounded-xl border p-6">
        {cart.map((item) => (
          <article key={item._id}>
            <CartItemElement product={item} payment={false} />
            <hr />
          </article>
        ))}
        <div className="pt-4">
          <button
            className="text-rose-foreground btn-outline ms-auto flex"
            onClick={emptyCart}
          >
            <BsTrash2 className="size-5" /> Vider le panier
          </button>
        </div>
      </section>
      <section className="bg-card border-border shadow-lift flex-2 rounded-xl border p-6">
        <h2 className="label pb-4">Récapitulatif</h2>
        <hr />
        <p className="flex justify-between py-4">
          <span className="text-muted-f">Total</span>
          <span className="font-medium">{total}</span>
        </p>
        <p className="text-muted-foreground mb-10 text-sm">
          Livraison offerte en France métropolitaine.
        </p>

        <Link href="/payment" className="btn-primary w-full">
          Passer au paiment <IoIosArrowRoundForward />
        </Link>
      </section>
    </div>
  );
};

export default CartSection;
