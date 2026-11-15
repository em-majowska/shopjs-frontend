"use server";

import api from "@/features/api/api";
import { TProduct } from "@/types";
import { isAxiosError } from "axios";
import { cacheLife } from "next/cache";

const searchData = async (
  query?: string,
): Promise<{ products: TProduct[]; error: null | string }> => {
  "use cache";
  cacheLife({
    revalidate: Number(process.env.NEXT_PUBLIC_PUBLIC_CACHE_LIFE) || 180,
  });

  try {
    const { data } = await api.get<TProduct[]>("/products", {
      params: { search: query },
    });

    return { products: data, error: null };
  } catch (error) {
    if (isAxiosError(error))
      return {
        products: [],
        error:
          "Nous n'avons pas pu récupérer les produits. Un problème technique temporaire s'est produit.",
      };
    else if (error instanceof Error)
      return { products: [], error: error.message };
    return {
      products: [],
      error:
        "Nous n'avons pas pu récupérer les produits. Un problème technique temporaire s'est produit.",
    };
  }
};

export default searchData;
