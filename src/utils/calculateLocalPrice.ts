import { TCartItem } from "@/types";

const calculatePrice = (item: TCartItem): number => {
  const cents = Math.round(item.price * 100 * item.quantity);

  return cents / 100;
};

const getLocalPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const calculateTotal = (items: TCartItem[]): number => {
  const totalInCents = items.reduce((sum, item) => {
    const cents = Math.round(item.price * item.quantity * 100);
    return sum + cents;
  }, 0);

  return totalInCents / 100;
};

const getLocalTotal = (items: TCartItem[]): string => {
  const euros = calculateTotal(items);

  return getLocalPrice(euros);
};

export { calculateTotal, getLocalTotal, getLocalPrice, calculatePrice };
