"use client";
import { useActionState, useEffect, useState } from "react";
import PayButton from "./PayButton";
import handlePayment from "@/actions/handlePayment";
import { useStore } from "@/store/store";
import { TPaymentFormState } from "@/types";
import CartList from "./CartList";
import { useRouter } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import Link from "next/link";

const PaymentSection = () => {
  const router = useRouter();
  const total: number = useStore((store) => store.getTotal());
  const totalLocale: string = useStore((store) => store.getTotalLocale());
  const cart = useStore((store) => store.cart);
  const emptyCart = useStore((store) => store.emptyCart);
  const products = cart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));
  const [countdown, setCountdown] = useState(10);
  const [address, setAddress] = useState<null | string>(null);
  const [paidTotal, setPaidTotal] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleWithData = handlePayment.bind(null, {
    products,
    total,
  });

  const [formState, formAction] = useActionState(
    async (prevState: TPaymentFormState, formData: FormData) => {
      const address = formData.get("address")?.toString().trim();

      if (!address) {
        throw new Error("Veuillez renseigner votre adresse de livraison.");
      }
      const { isSuccess: success, error } = await handleWithData(
        prevState,
        formData,
      );

      if (success) {
        setPaidTotal(totalLocale);
        setAddress(address);
        setIsSuccess(true);
        emptyCart();
        return { isSuccess, error: null };
      }
      return { isSuccess: false, error };
    },
    {
      isSuccess: false,
      error: null,
    },
  );
  const { error } = formState;

  // If successful order, redirect after 10 seconds to products page
  useEffect(() => {
    if (!isSuccess) return;

    const redirectTimer = setTimeout(() => {
      router.replace("/products");
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
      setIsSuccess(false);
    };
  }, [isSuccess, router]);

  return isSuccess ? (
    <section className="bg-card border-border shadow-lift flex flex-col items-center justify-center gap-4 rounded-2xl border p-12 text-center">
      <CiCircleCheck className="text-rose size-12" />
      <h2 className="font-display text-2xl font-medium md:text-3xl">
        Votre commande est validée !
      </h2>
      <p className="text-muted-foreground">
        Votre commande d&apos;un montant de{" "}
        <span className="text-primary! font-medium">{paidTotal}</span> a bien
        été enregistrée.
        <br />
        Elle sera préparée avec soin et livrée à l&apos;adresse indiquée.
      </p>
      <p className="border-border rounded-xl border p-4 text-left whitespace-pre-line">
        {address}
      </p>
      <p className="text-muted-foreground">
        Vous allez être redirigé vers la boutique dans{" "}
        <span className="font-medium">{countdown} seconds</span>...
      </p>
      <Link href="/products" className="btn-primary">
        Continuer mes achats
      </Link>
    </section>
  ) : (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      <CartList />

      <form
        action={formAction}
        className="bg-card border-border shadow-lift flex flex-2 flex-col gap-4 rounded-xl border p-6"
      >
        <label htmlFor="address" className="label">
          Adresse de livraison
        </label>

        <textarea
          name="address"
          id="address"
          required
          rows={4}
          placeholder="12 rue des Lilas&#10;750011 Paris&#10;France"
          className="field border-border mt-0! resize-none border"
        ></textarea>
        {error && <p className="text-destructive">{error}</p>}
        <PayButton />
      </form>
    </div>
  );
};

export default PaymentSection;
