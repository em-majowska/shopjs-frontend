export const dynamic = "force-dynamic";

import api from "@/features/api/api";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const fetchProduct = async (id: string) => {
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

const ProductIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  const { title, description, price, brand, rating, images } = product;
  return (
    <main>
      <Link href="/products">
        <IoIosArrowRoundBack /> Tous les produits
      </Link>
      <section>
        <div>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="Image du produit"
              width="530"
              height="530"
            />
          ))}
        </div>
        <p>{brand}</p>
        <h2>{title}</h2>
        <p>{price} €</p>
        <p>{rating} stars</p>
        <p>{description}</p>
        <br />
        <div>
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </div>
      </section>
    </main>
  );
};

export default ProductIdPage;
