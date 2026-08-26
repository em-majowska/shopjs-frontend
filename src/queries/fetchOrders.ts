"use server";
import api from "@/features/api/api";
import { TOrder } from "@/types";
import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/headers";

const getCachedOrders = async (token: string) => {
  "use cache";
  cacheLife({ revalidate: 10 });
  cacheTag("admin-orders");

  const { data } = await api.get<TOrder[]>("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

const fetchOrders = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Veuillez vous connecter.");
    }

    return await getCachedOrders(token);
  } catch (error) {
    throw new Error(
      "Nous n'avons pas pu récupérer les informations de commandes.",
    );
  }
};

export default fetchOrders;
