import Link from "next/link";
import ProductCard from "./ProductCard";
import searchData from "@/queries/searchData";

type TProductsList = {
  searchParams: Promise<{ search?: string }>;
};

const ProductsList = async ({ searchParams }: TProductsList) => {
  const { search } = await searchParams;
  const { products, error } = await searchData(search);

  return error ? (
    <p className="text-muted-foreground py-10 text-center">{error}</p>
  ) : products.length === 0 ? (
    <p className="text-muted-foreground py-10 text-center">
      Aucun produit ne correspond à votre recherche.
    </p>
  ) : (
    <section className="grid-cols01 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </section>
  );
};

export default ProductsList;
