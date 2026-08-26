export const metadata: Metadata = {
  title: "Votre panier — Maison Lumière",
  description: "Retrouvez les soins sélectionnés dans votre panier.",
};

import CartSection from "@/components/CartSection";
import { Metadata } from "next";

const CartPage = () => {
  return (
    <main className="main content">
      <p className="label text-rose-foreground">Votre séléction</p>
      <h1 className="font-display mb-10 text-4xl font-medium md:text-5xl">
        Panier
      </h1>
      <CartSection />
    </main>
  );
};

export default CartPage;
