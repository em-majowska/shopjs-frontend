import OrdersCounter from "@/components/OrdersCounter";
import OrdersList from "@/components/OrdersList";
import { OrderCardSkeleton } from "@/components/Skeletons";
import { headers } from "next/headers";
import { Suspense } from "react";

const AdminPage = () => {
  return (
    <main className="main content">
      <Suspense>
        <HeaderGuard />
      </Suspense>

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

async function HeaderGuard() {
  const headerList = await headers();
  const errorMessage = headerList.get("x-error-message");

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return null;
}

export default AdminPage;
