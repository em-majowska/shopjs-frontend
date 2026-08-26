import React from "react";
import { LuPackageCheck } from "react-icons/lu";
import { PiPackageLight } from "react-icons/pi";

type TDeliveryPill = {
  delivered: boolean;
};

const DeliveryPill = ({ delivered }: TDeliveryPill) => {
  return delivered ? (
    <div className="bg-sand text-primary flex items-center gap-2 rounded-2xl px-3 py-1 text-nowrap">
      <LuPackageCheck className="size-4" />
      <p>Livrée</p>
    </div>
  ) : (
    <div className="bg-accent text-rose-foreground flex items-center gap-2 rounded-2xl px-3 py-1 text-nowrap">
      <PiPackageLight className="size-4" />
      <p>En cours</p>
    </div>
  );
};

export default DeliveryPill;
