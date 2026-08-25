"use client";
import { useActionState, useEffect, useState } from "react";
import PayButton from "./PayButton";
import { MdOutlineCelebration } from "react-icons/md";
import handlePayment from "@/actions/payment";
import { useStore } from "@/store/store";
import { TPaymentFormState } from "@/types";
import CartList from "./CartList";
import { useRouter } from "next/navigation";

const PaymentSection = () => {
  const router = useRouter();
  const price: number = useStore((store) => store.getTotal());
  const cart = useStore((store) => store.cart);
  const emptyCart = useStore((store) => store.emptyCart);
  const products = cart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));
  const [countdown, setCountdown] = useState(10);

  const handleWithData = handlePayment.bind(null, {
    products,
    price,
  });

  const [formState, formAction] = useActionState(
    async (prevState: TPaymentFormState, formData: FormData) => {
      const { isSuccess, error } = await handleWithData(prevState, formData);

      if (error) return { isSuccess: false, error };
      emptyCart();
      return { isSuccess, error: null };
    },
    {
      isSuccess: false,
      error: null,
    },
  );
  const { isSuccess, error } = formState;

  useEffect(() => {
    if (!isSuccess) return;

    const redirectTimer = setTimeout(() => {
      router.push("/products");
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [isSuccess, router]);

  return isSuccess ? (
    <section className="bg-card border-border shadow-lift flex flex-col items-center justify-center gap-4 rounded-xl border p-12 text-center">
      <MdOutlineCelebration className="text-primary size-12" />
      <h2 className="font-display text-2xl font-medium md:text-3xl">
        Votre commande est validée !
      </h2>
      <p className="text-muted-foreground">
        Merci pour votre achat. Vous allez être redirigé vers la boutique dans{" "}
        <span className="font-medium">{countdown} seconds</span>...
      </p>
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
