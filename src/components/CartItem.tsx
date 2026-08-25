import { TCartItem } from "@/types";
import Image from "next/image";
import CartItemCounter from "./CartItemCounter";
import Link from "next/link";

type TCartItemElement = {
  product: TCartItem;
  payment?: boolean;
};

const CartItemElement = ({ product, payment = false }: TCartItemElement) => {
  const { thumbnail, title, price, quantity, _id } = product;
  return payment ? (
    <article className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <p className="text-md font-medium">
          {title}{" "}
          <span className="text-muted-foreground text-sm">x {quantity}</span>
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="font-medium">{price * quantity} €</p>
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
          <p className="text-muted-foreground">
            <span>{price} €</span> ·{" "}
            <span>
              {quantity} article{quantity > 1 && "s"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="font-medium">{price * quantity} €</p>
        {!payment && <CartItemCounter product={product} />}
      </div>
    </article>
  );
};

export default CartItemElement;
