"use client";
import CartItemElement from "./CartItem";
import { useStore } from "@/store/store";

const CartList = () => {
  const cart = useStore((store) => store.cart);
  const total = useStore((store) => store.getTotal());

  return (
    <section className="bg-card border-border shadow-lift flex flex-3 flex-col gap-3 rounded-xl border p-6">
      <h2 className="label">Récapitulatif du panier</h2>

      {cart.map((item) => (
        <>
          <CartItemElement key={item._id} product={item} payment={true} />
        </>
      ))}
      <hr />

      <p className="flex items-end justify-between py-4 text-lg">
        <span className="label">Total</span>
        <span className="font-medium">{total} €</span>
      </p>
    </section>
  );
};

export default CartList;
