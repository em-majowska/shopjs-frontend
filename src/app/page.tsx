import Image from "next/image";
import Link from "next/link";
import { LuDroplet, LuLeaf, LuHandHeart } from "react-icons/lu";
import HeroImage from "@/assets/hero.jpg";
import EssentialProducts from "@/components/EssentialProducts";
import { IoIosArrowRoundForward } from "react-icons/io";
import searchData from "@/queries/searchData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison Lumière — Boutique de cosmétiques français",
  description:
    "Découvrez Maison Lumière : soins du visage, parfums et savons artisanaux composés en France, dans une boutique en ligne délicate et épurée.",
};

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

export default async function Home() {
  const { products } = await searchData();

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
          <p className="text-balance">
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
      <section className="border-border bg-sand/80 mb-20 border-t border-b px-4 py-15">
        <div className="content flex flex-col gap-10 md:flex-row">
          {values.map((val) => (
            <div
              key={val.title}
              className="flex flex-col items-center gap-4 md:items-start"
            >
              <val.icon className="text-rose size-6" />
              <h2 className="font-display text-2xl font-medium">{val.title}</h2>
              <p className="text-muted-foreground max-w-[65ch] text-center text-sm text-balance md:text-start">
                {val.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      {products && <EssentialProducts products={products} />}
    </main>
  );
}
