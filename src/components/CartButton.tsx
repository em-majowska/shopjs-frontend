"use client";
import { useHydrated } from "@/hooks/useHydrated";
import { useStore } from "@/store/store";
import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";

const CartButton = ({ closeMenu }: { closeMenu?: () => void }) => {
  const total = useStore((store) => store.getTotalLocale());
  const isHydrated = useHydrated();

  return (
    <Link
      href="/cart"
      className="btn-primary flex items-center gap-2"
      onClick={closeMenu}
    >
      <LuShoppingBag className="size-5" />
      <span className="hidden md:inline">Panier</span>
      <span className="text-nowrap">{isHydrated && `${total}`}</span>
    </Link>
  );
};

export default CartButton;
