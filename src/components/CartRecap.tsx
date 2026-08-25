"use client";
import { useStore } from "@/store/store";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const CartRecap = () => {
  const total = useStore((store) => store.getTotal());
  return (
    <section className="bg-card border-border shadow-lift flex-2 rounded-xl border p-6">
      <p className="label pb-4">Récapitulatif</p>
      <hr />
      <p className="flex justify-between py-4">
        <span className="text-muted-f">Total</span>
        <span className="font-medium">{total} €</span>
      </p>
      <p className="text-muted-foreground mb-10 text-sm">
        Livraison offerte en France métropolitaine.
      </p>

      <Link href="/payment" className="btn-primary w-full">
        Passer au paiment <IoIosArrowRoundForward />
      </Link>
    </section>
  );
};

export default CartRecap;
