import OrdersCounter from "@/components/OrdersCounter";
import OrdersList from "@/components/OrdersList";
import { OrderCardSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

const AdminPage = async () => {
  return (
    <main className="main content">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="label text-rose-foreground">Administration</p>
          <h1 className="font-display text-4xl font-medium md:text-5xl">
            Commandes
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="bg-muted h-4 w-32 animate-pulse rounded-md"></div>
          }
        >
          <OrdersCounter />
        </Suspense>
      </div>
      <Suspense fallback={<OrderCardSkeleton />}>
        <OrdersList />
      </Suspense>
    </main>
  );
};

export default AdminPage;
