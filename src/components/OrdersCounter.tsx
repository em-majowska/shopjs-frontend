import fetchOrders from "@/queries/fetchOrders";

const OrdersCounter = async () => {
  const orders = await fetchOrders();
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
