"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useRef } from "react";
import { MdArrowBack } from "react-icons/md";

type TEssentialProducts = {
  products: TProduct[];
};

const EssentialProducts = ({ products }: TEssentialProducts) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768) {
        if (e.deltaY !== 0) {
          e.preventDefault();

          carousel.scrollLeft += e.deltaY * 2;
        }
      }
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => carousel.removeEventListener("wheel", handleWheel);
  }, []);

  return products.length > 0 ? (
    <section className="content flex flex-col gap-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="label text-accent-foreground">Notre sélection</p>
          <h2 className="font-display text-4xl md:text-5xl">
            Les essentiels de la maison
          </h2>
        </div>
        <Link
          href="/products"
          className="label hover:text-accent-foreground hidden items-center gap-2 sm:flex"
        >
          Tout voir <IoIosArrowRoundForward />
        </Link>
      </div>
      <div
        ref={carouselRef}
        className="no-scrollbar grid grid-cols-1 gap-6 sm:grid-cols-2 md:flex md:overflow-x-auto md:scroll-smooth md:pr-12"
      >
        {products.slice(0, 5).map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="w-full shrink-0 md:w-[calc((100%-3rem)/2.5)]"
          >
            <ProductCard product={product} />
          </Link>
        ))}
        <div className="hidden flex-col items-center justify-center gap-3 px-10 md:flex">
          <div className="btn-outline h-12 w-12 rounded-full">
            <button
              onClick={() =>
                carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" })
              }
            >
              <MdArrowBack className="text-xl hover:cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      <Link
        href="/products"
        className="label btn-outline self-center sm:hidden"
      >
        Voir tous les produits
      </Link>
    </section>
  ) : null;
};

export default EssentialProducts;
