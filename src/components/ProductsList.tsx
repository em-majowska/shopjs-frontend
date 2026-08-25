import api from "@/features/api/api";
import { TProduct } from "@/types";
import Link from "next/link";
import ProductCard from "./ProductCard";

const fetchData = async () => {
  try {
    const { data } = await api.get<TProduct[]>("/products");

    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
const ProductsList = async () => {
  const products = await fetchData();

  return (
    <section>
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </section>
  );
};

export default ProductsList;
