"use server";
import api from "@/features/api/api";
import { TOrder } from "@/types";
import { cacheLife, cacheTag } from "next/cache";

const fetchOrders = async (token: string) => {
  "use cache";
  cacheLife({ revalidate: 60 });
  cacheTag("admin-orders");

  try {
    const { data } = await api.get<TOrder[]>("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch {
    throw new Error(
      "Nous n'avons pas pu récupérer les informations de commandes.",
    );
  }
};

export default fetchOrders;
