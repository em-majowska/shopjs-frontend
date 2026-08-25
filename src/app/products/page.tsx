export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import SearchInput from "@/components/SearchInput";
import api from "@/features/api/api";
import { TProduct } from "@/types";
import Link from "next/link";
import { cache } from "react";

// TODO pregenerate on build

const fetchProducts = cache(async () => {
  try {
    const { data } = await api.get<TProduct[]>(`/products`);

    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error(
      "Nous n&apos;avons pas pu récupérer les produits. Un problème technique temporaire s&apos;est produit.",
    );
  }
});

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <main className="main content">
      <div className="mb-10 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="label text-rose-foreground">La Boutique</p>
          <h1 className="font-display text-4xl font-medium md:text-5xl">
            Tous nos produits
          </h1>
        </div>
        <SearchInput />
      </div>
      <div className="grid-cols01 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
