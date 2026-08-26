import fetchOrders from "@/queries/fetchOrders";
import { PiPackageLight } from "react-icons/pi";
import OrderCard from "./OrderCard";
import fetchProduct from "@/queries/fetchProduct";
import { TProduct } from "@/types";

const OrdersList = async () => {
  const orders = await fetchOrders();

  const uniqueProductIds = Array.from(
    new Set(orders.flatMap((order) => order.products.map((p) => p.product))),
  );
  const productResults = await Promise.all(
    uniqueProductIds.map((id) => fetchProduct(id)),
  );

  const productMap = new Map<string, TProduct>(
    productResults.map((product) => [product._id, product]),
  );

  return orders.length === 0 ? (
    <section className="flex items-center justify-center">
      <div className="bg-card border-border mx-auto flex flex-col items-center justify-center gap-6 rounded-2xl border p-15">
        <PiPackageLight className="text-rose-foreground size-10" />
        <p className="font-display text-center text-2xl font-medium">
          Aucune commande pour le moment
        </p>
        <p className="text-muted-foreground">
          Les commandes passées sur la boutique apparaîtront ici.
        </p>
      </div>
    </section>
  ) : (
    <section className="flex flex-col gap-6">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} productMap={productMap} />
      ))}
    </section>
  );
};

export default OrdersList;
