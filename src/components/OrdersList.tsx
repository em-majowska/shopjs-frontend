import fetchOrders from "@/queries/fetchOrders";
import { PiPackageLight } from "react-icons/pi";
import fetchProduct from "@/queries/fetchProduct";
import { TOrder, TOrderItem, TProduct } from "@/types";
import { cookies } from "next/headers";
import DragAndDrop from "./DragAndDrop";

const OrdersList = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("Veuillez vous connecter.");
  }
  const orders = await fetchOrders(token);

  const uniqueProductIds = Array.from(
    new Set(
      orders.flatMap((order) =>
        order.products.map((p) => {
          if ("product" in p) return p.product;
          return p._id;
        }),
      ),
    ),
  );

  // fetch products to show name
  const productResults = await Promise.all(
    uniqueProductIds.map((id) => fetchProduct(id)),
  );

  const productMap = new Map<string, TProduct>(
    productResults.map((product) => [product._id, product]),
  );

  const namedOrders: TOrder[] = orders.map((order) => ({
    ...order,
    products: (order.products as TOrderItem[])
      .map((item) => {
        const matchedProduct = productMap.get(item.product);
        if (!matchedProduct) return null;
        return {
          ...matchedProduct,
          quantity: item.quantity,
        };
      })
      .filter((item) => item !== null),
  }));

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
    <>
      <DragAndDrop orders={namedOrders} />

      {/* <section className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} productMap={productMap} />
        ))}
      </section> */}
    </>
  );
};

export default OrdersList;
