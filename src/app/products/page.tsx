import ProductsList from "@/components/ProductsList";
import SearchInput from "@/components/SearchInput";
import { ProductsSkeleton } from "@/components/Skeletons";
import searchData from "@/queries/searchData";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const { products } = await searchData();

  return products.map((product) => ({
    id: product._id,
  }));
};

export const metadata: Metadata = {
  title: "Nos produits — Maison Lumière",
  description:
    "Parcourez la collection Maison Lumière : sérums, crèmes, parfums, huiles et savons artisanaux français.",
};

type TProductsPage = {
  searchParams: Promise<{ search?: string }>;
};

const ProductsPage = async ({ searchParams }: TProductsPage) => {
  return (
    <main className="main content">
      <div className="mb-10 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="label text-rose-foreground">La Boutique</p>
          <h1 className="font-display text-4xl font-medium md:text-5xl">
            Tous nos produits
          </h1>
        </div>
        <Suspense
          fallback={
            <div className="bg-muted h-10 w-full animate-pulse rounded-lg md:w-64" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default ProductsPage;
