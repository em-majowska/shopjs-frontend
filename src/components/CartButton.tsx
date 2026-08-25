"use client";
import { useHydrated } from "@/hooks/useHydrated";
import { useStore } from "@/store/store";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";

const CartButton = () => {
  const total = useStore((store) => store.getTotal());
  const isHydrated = useHydrated();

  return (
    <Link href="/cart" className="btn-primary flex items-center gap-2">
      <LuShoppingBag className="size-5" />
      <span className="hidden md:inline">Panier</span>
      <span className="text-nowrap">
        {isHydrated && total > 0 ? `${total} €` : "0,00 €"}
      </span>
    </Link>
  );
};

export default CartButton;
