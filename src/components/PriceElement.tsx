import { TCartItem, TProduct } from "@/types";
import { calculatePrice, getLocalPrice } from "@/utils/calculateLocalPrice";

type TPriceElement = {
  product: TCartItem | TProduct;
  className?: string;
  calculate?: boolean;
};

const PriceElement = ({
  product,
  className,
  calculate = false,
}: TPriceElement) => {
  return "quantity" in product && calculate ? (
    <p className={`font-medium ${className}`}>
      {getLocalPrice(calculatePrice(product))}
    </p>
  ) : (
    <p className={`font-medium ${className}`}>{getLocalPrice(product.price)}</p>
  );
};

export default PriceElement;
