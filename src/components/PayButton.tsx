"use client";

import { useHydrated } from "@/hooks/useHydrated";
import { useStore } from "@/store/store";
import { useFormStatus } from "react-dom";
import { SlWallet } from "react-icons/sl";

const PayButton = () => {
  const isHydrated = useHydrated();

  const total = useStore((store) => store.getTotalLocale());
  const { pending } = useFormStatus();
  return (
    <button className="btn-primary w-full" disabled={pending}>
      <SlWallet className="size-4" />{" "}
      {pending ? (
        "Payment en cours de validation..."
      ) : (
        <span>Payer {isHydrated && `(${total})`}</span>
      )}
    </button>
  );
};

export default PayButton;
