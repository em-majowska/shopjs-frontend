const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-muted aspect-square w-full animate-pulse rounded-xl"
        />
      ))}
    </div>
  );
};

const ProductPageSkeleton = () => {
  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <div className="border-border bg-muted/30 aspect-square w-full animate-pulse rounded-xl border md:w-1/2" />

      <div className="flex flex-1 flex-col gap-8 md:justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="bg-muted/40 h-4 w-24 animate-pulse rounded-md" />
            <div className="bg-muted/40 h-10 w-3/4 animate-pulse rounded-lg md:h-12" />
            <div className="bg-muted/40 h-8 w-28 animate-pulse rounded-md" />
          </div>

          <div className="bg-muted/30 h-4 w-16 animate-pulse rounded-md" />

          <div className="flex flex-col gap-2 pt-2">
            <div className="bg-muted/30 h-4 w-full animate-pulse rounded-md" />
            <div className="bg-muted/30 h-4 w-5/6 animate-pulse rounded-md" />
            <div className="bg-muted/30 h-4 w-2/3 animate-pulse rounded-md" />
          </div>
        </div>

        <hr className="border-border" />

        <div className="bg-muted/40 h-12 w-full animate-pulse rounded-xl md:w-48" />
      </div>
    </section>
  );
};

const OrderCardSkeleton = () => {
  return (
    <div className="bg-card border-border mx-auto flex w-full max-w-xl animate-pulse flex-col gap-4 rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <div className="bg-muted h-6 w-36 rounded-md" />
        <div className="bg-muted h-6 w-24 rounded-full" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-muted h-4 w-48 rounded-md" />
        <div className="bg-muted h-4 w-64 rounded-md" />
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted size-12 rounded-lg" />
            <div className="flex flex-col gap-1">
              <div className="bg-muted h-4 w-32 rounded-md" />
              <div className="bg-muted h-3 w-16 rounded-md" />
            </div>
          </div>
          <div className="bg-muted h-4 w-12 rounded-md" />
        </div>
      </div>

      <hr className="border-border" />

      <div className="flex items-end justify-between py-2">
        <div className="bg-muted h-5 w-12 rounded-md" />
        <div className="bg-muted h-6 w-20 rounded-md" />
      </div>

      <div className="bg-muted h-10 w-44 self-end rounded-xl" />
    </div>
  );
};

const OrdersListSkeleton = () => {
  return (
    <section className="flex flex-col gap-6">
      <OrderCardSkeleton />
      <OrderCardSkeleton />
      <OrderCardSkeleton />
    </section>
  );
};

export default OrdersListSkeleton;

export { ProductsSkeleton, ProductPageSkeleton, OrderCardSkeleton };
