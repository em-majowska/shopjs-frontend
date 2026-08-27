import api from "@/features/api/api";
import { TProduct } from "@/types";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

const fetchProduct = async (id: string) => {
  "use cache";
  cacheLife({ revalidate: 180 });
  try {
    const { data } = await api.get<TProduct>(`/products/${id}`);

    return data;
  } catch {
    notFound();
  }
};

export default fetchProduct;
