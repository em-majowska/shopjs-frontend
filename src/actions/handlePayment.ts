"use server";
import api from "@/features/api/api";
import isAuthenticated from "@/middlewares/isAuthenticated";
import { TPaymentFormState } from "@/types";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

type TOrderData = {
  products: { product: string; quantity: number }[];
  total: number;
};

const handlePayment = async (
  orderData: TOrderData,
  prevState: TPaymentFormState,
  formData: FormData,
): Promise<TPaymentFormState> => {
  try {
    const token = isAuthenticated();
    if (!token) {
      throw new Error("Veuillez vous connecter avant de commander.");
    }
    const { products, total } = orderData;

    if (!products || products.length === 0) {
      throw new Error(
        "Votre panier est vide. Veuillez ajouter des articles avant de commander.",
      );
    }
    const address = formData.get("address")?.toString().trim();

    await api.post(
      "/orders",
      { products, address, price: total },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return { isSuccess: true, error: null };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ...prevState,
        error:
          "Impossible de finaliser la commande pour le moment. Veuillez réassayer plus tard.",
      };
    }
    if (error instanceof Error) {
      return { ...prevState, error: error.message };
    }

    return {
      ...prevState,
      error: "Une erreur inattendue est survenue. Veuillez réessayer.",
    };
  }
};

export default handlePayment;
