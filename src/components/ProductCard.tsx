import { TProduct } from "@/types";
import Image from "next/image";
import CartItemCounter from "./CartItemCounter";
import PriceElement from "./PriceElement";

type TProductCard = {
  product: TProduct;
};

const ProductCard = ({ product }: TProductCard) => {
  return (
    <article className="group border-border shadow-lift hover:shadow-soft fade-up flex h-full flex-col rounded-2xl border transition-all">
      <div className="overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="1024"
          height="1024"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="border-border flex flex-1 flex-col justify-between gap-1 border-t p-5">
        <div>
          <p className="label text-accent-foreground">{product.brand}</p>
          <p className="font-display text-xl font-medium">{product.title}</p>
        </div>
        <div className="flex items-center justify-between">
          <PriceElement product={product} />
          <CartItemCounter product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
