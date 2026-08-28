"use server";
import api from "@/features/api/api";
import isAdmin from "@/middlewares/isAdmin";
import { isAxiosError } from "axios";
import { updateTag } from "next/cache";

const handleDelivery = async (id: string): Promise<string | null> => {
  try {
    const token = await isAdmin();

    if (!token) {
      throw new Error("Action non authorizée.");
    }

    await api.put(
      `/orders/mark-delivered/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // mark data as stale
    updateTag("admin-orders");
    return null;
  } catch (error) {
    if (isAxiosError(error)) {
      return "Impossible de finaliser la commande pour le moment. Veuillez réassayer plus tard.";
    }
    if (error instanceof Error) {
      return error.message;
    }

    return "Une erreur inattendue est survenue. Veuillez réessayer.";
  }
};

export default handleDelivery;
