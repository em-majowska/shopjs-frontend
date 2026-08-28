"use client";
import { TCartItem, TOrder } from "@/types";
import DeliveryPill from "./DeliveryPill";
import CartItemElement from "./CartItem";
import { getLocalPrice } from "@/utils/calculateLocalPrice";
import { LuPackageCheck } from "react-icons/lu";
import handleDelivery from "@/actions/handleDelivery";
import { useState, useTransition } from "react";

type TOrderCard = {
  order: TOrder;
};

const OrderCard = ({ order }: TOrderCard) => {
  const { _id, owner, products, price, delivered, address } = order;
  const [error, setError] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  const markDelivered = () => {
    setError(null);

    startTransition(async () => {
      const error = await handleDelivery(_id);
      if (error) {
        setError(error);
      }
    });
  };

  return (
    <section className="bg-card border-border shadow-shadow fade-up mx-auto flex w-full max-w-xl flex-3 flex-col gap-3 rounded-2xl border p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-rose-foreground text-lg">{_id}</h2>
        <DeliveryPill delivered={delivered} />
      </div>
      <div className="flex flex-col gap-3">
        <p>
          {owner.username}, {owner.email}
        </p>
        <p className="text-muted-foreground whitespace-pre">{address}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-1">
        {products.map((item) => {
          return (
            <CartItemElement
              key={item._id}
              product={item as TCartItem}
              payment={true}
            />
          );
        })}
      </div>
      <hr />

      <p className="flex items-end justify-between py-4 text-lg">
        <span className="label">Total</span>
        <span className="font-medium">{getLocalPrice(price)}</span>
      </p>
      {error && (
        <p className="text-destructive self-end text-sm font-medium">{error}</p>
      )}

      {!delivered && (
        <button
          className="btn-primary self-end"
          onClick={markDelivered}
          disabled={isPending}
        >
          <LuPackageCheck className="size-4" />
          {isPending ? "Traitement..." : "Marquer comme livrée"}
        </button>
      )}
    </section>
  );
};

export default OrderCard;
