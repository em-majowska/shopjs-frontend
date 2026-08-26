import api from "@/features/api/api";
import { TProduct } from "@/types";
import { cacheLife } from "next/cache";

const fetchProduct = async (id: string) => {
  "use cache";
  cacheLife({ revalidate: 10 });
  try {
    const { data } = await api.get<TProduct>(`/products/${id}`);

    return data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw new Error(
      "Nous n&apos;avons pas pu récupérer les informations de nos produits. Un problème technique temporaire s&apos;est produit.",
    );
  }
};

export default fetchProduct;
