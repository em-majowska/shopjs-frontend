import { TCartItem } from "@/types";
import Image from "next/image";
import CartItemCounter from "./CartItemCounter";
import Link from "next/link";
import PriceElement from "./PriceElement";

type TCartItemElement = {
  product: TCartItem;
  payment?: boolean;
};

const CartItemElement = ({ product, payment = false }: TCartItemElement) => {
  const { thumbnail, title, quantity, _id } = product;
  return payment ? (
    <article className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <p className="text-md font-medium">
          {title}{" "}
          <span className="text-muted-foreground text-sm">x {quantity}</span>
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <PriceElement product={product} calculate={true} />
      </div>
    </article>
  ) : (
    <article className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${_id}`}
          className="border-border h-25 w-25 overflow-hidden rounded-xl border"
        >
          <Image
            src={thumbnail}
            alt={title}
            width="100"
            height="100"
            className="h-full w-full object-cover"
          />
        </Link>
        <div>
          <Link
            href={`/products/${_id}`}
            className="font-display text-lg font-medium hover:underline"
          >
            {title}
          </Link>
          <div className="text-muted-foreground">
            <PriceElement className="inline" product={product} /> ·{" "}
            <span>
              {quantity} article{quantity > 1 && "s"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <PriceElement product={product} calculate={true} />

        {!payment && <CartItemCounter product={product} />}
      </div>
    </article>
  );
};

export default CartItemElement;
