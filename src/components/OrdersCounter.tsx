import fetchOrders from "@/queries/fetchOrders";
import { cookies } from "next/headers";

const OrdersCounter = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("Veuillez vous connecter.");
  }
  const orders = await fetchOrders(token);
  const pending = orders.filter((order) => !order.delivered);

  return (
    <p>
      <span className="text-primary font-medium">{pending.length}</span>
      <span className="text-muteed-foreground text-sm"> en cours · </span>
      <span className="text-primary font-medium">{orders.length}</span>
      <span className="text-muteed-foreground text-sm"> au total</span>
    </p>
  );
};

export default OrdersCounter;
