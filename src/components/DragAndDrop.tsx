"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import OrderCard from "./OrderCard";
import { TOrder } from "@/types";
import { startTransition, useOptimistic } from "react";
import handleDelivery from "@/actions/handleDelivery";

type TDragAndDrop = {
  orders: TOrder[];
};

type TOptimisticAction = {
  sourceDroppableId: string;
  destinationDroppableId: string;
  sourceIndex: number;
  destinationIndex: number;
};

const optimisticAction = (currOrders: TOrder[], action: TOptimisticAction) => {
  const isSourceDelivered = action.sourceDroppableId === "Livrée";
  const isDestinationDelivered = action.destinationDroppableId === "Livrée";
  const sourceList = currOrders.filter(
    (o) => o.delivered === isSourceDelivered,
  );
  const movedOrder = sourceList[action.sourceIndex];

  if (!movedOrder) return currOrders;

  const updatedOrder: TOrder = {
    ...movedOrder,
    delivered: isDestinationDelivered,
  };

  const remaining = currOrders.filter((o) => o._id !== updatedOrder._id);
  const destinationList = remaining.filter(
    (o) => o.delivered === isDestinationDelivered,
  );

  destinationList.splice(action.destinationIndex, 0, updatedOrder);
  const nonDest = remaining.filter(
    (o) => o.delivered !== isDestinationDelivered,
  );

  return [...nonDest, ...destinationList];
};

const DragAndDrop = ({ orders }: TDragAndDrop) => {
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(
    orders,
    optimisticAction,
  );

  const pendingOrders = optimisticOrders.filter((order) => !order.delivered);
  const deliveredOrders = optimisticOrders.filter((order) => order.delivered);

  const pending = {
    status: "En cours",
    orders: pendingOrders,
  };

  const delivered = {
    status: "Livrée",
    orders: deliveredOrders,
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // no change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    startTransition(async () => {
      setOptimisticOrders({
        sourceDroppableId: source.droppableId,
        destinationDroppableId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });

      handleDelivery(draggableId);
    });
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between gap-16">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={pending.status}>
            {(provided) => (
              <div
                className="flex flex-1 flex-col gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-display text-2xl">{pending.status}</h2>
                {pending.orders.map((order, index) => (
                  <Draggable
                    key={order._id}
                    draggableId={order._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }}
                      >
                        <OrderCard order={order} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={delivered.status}>
            {(provided) => (
              <div
                className="flex flex-1 flex-col gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-display text-2xl">{delivered.status}</h2>
                {delivered.orders.map((order, index) => (
                  <Draggable
                    key={order._id}
                    draggableId={order._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }}
                      >
                        <OrderCard order={order} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
};

export default DragAndDrop;
