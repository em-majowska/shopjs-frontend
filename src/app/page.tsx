export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { LuDroplet, LuLeaf, LuHandHeart } from "react-icons/lu";
import HeroImage from "@/assets/hero.jpg";
import EssentialProducts from "@/components/EssentialProducts";
import { IoIosArrowRoundForward } from "react-icons/io";
import { cache } from "react";
import api from "@/features/api/api";
import { TProduct } from "@/types";

const values = [
  {
    icon: LuLeaf,
    title: "Ingrédients naturels",
    text: "Des formules composées à plus de 95 % d'ingrédients d'origine naturelle.",
  },
  {
    icon: LuDroplet,
    title: "Fabriqué en France",
    text: "Nos soins et parfums sont imaginés et fabriqués entre Grasse et la Provence.",
  },
  {
    icon: LuHandHeart,
    title: "Gestuelle délicate",
    text: "Des textures fines et des parfums discrets, pensés pour les peaux sensibles.",
  },
];

const fetchData = cache(async () => {
  try {
    const { data } = await api.get<TProduct[]>("/products");

    return data.slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
});

export default async function Home() {
  const products = await fetchData();

  return (
    <main className="main w-full">
      <section className="content mb-20 flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex flex-col gap-7">
          <div>
            <p className="text-rose-foreground label mb-2">
              Cosmétiques français · Depuis 2018
            </p>
            <h1 className="font-display text-5xl">
              La beauté,
              <br />
              en toute{" "}
              <em className="text-rose-foreground italic">délicatesse</em>
            </h1>
          </div>
          <p>
            Maison Lumière compose des soins, des parfums et des savons
            artisanaux aux formules courtes et aux textures fines. Une routine
            simple, sensorielle, respectueuse de votre peau.
          </p>
          <Link href="/products" className="btn-primary self-start">
            Découvrir la boutique <IoIosArrowRoundForward size="20px" />
          </Link>
        </div>
        <Image
          src={HeroImage}
          height="330"
          width="530"
          alt="Sérum et crème Maison Lumière entourés de pétales de rose"
          priority
          className="border-border shadow-soft rounded-xl border"
        />
      </section>
      <section className="border-border bg-sand/80 mb-20 flex flex-col gap-10 border-t border-b px-4 py-15">
        {values.map((val) => (
          <div key={val.title} className="flex flex-col items-center gap-5">
            <val.icon className="text-rose" size="25px" />
            <h2 className="font-display text-2xl font-medium">{val.title}</h2>
            <p className="text-muted-foreground text-center text-sm">
              {val.text}
            </p>
          </div>
        ))}
      </section>
      {products && <EssentialProducts products={products} />}
    </main>
  );
}
