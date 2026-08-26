import BackButton from "@/components/BackButton";
import ProductDetails from "@/components/ProductDetails";
import { ProductPageSkeleton } from "@/components/Skeletons";
import fetchProduct from "@/queries/fetchProduct";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
  params,
}: TProductIdPage): Promise<Metadata> => {
  const { id } = await params;
  try {
    const product = await fetchProduct(id);

    if (!product) {
      return {
        title: "Produit non trouvé | Maison Lumière",
      };
    }

    return {
      title: `${product.title} | Maison Lumière`,
      description: product.description || "Découvrez nos produits d'exception.",
    };
  } catch {
    return {
      title: "Produit | Maison Lumière",
    };
  }
};

type TProductIdPage = {
  params: Promise<{ id: string }>;
};
const ProductIdPage = async ({ params }: TProductIdPage) => {
  return (
    <main className="main content">
      <BackButton />
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
};

export default ProductIdPage;
