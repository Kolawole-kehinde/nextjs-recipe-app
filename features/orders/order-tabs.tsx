"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { OrderCard } from "./order-card";
import { useOrder } from "@/hooks/useOrders";
import type { Order } from "@/types/order";

export function OrdersTabs() {
  const { orders, isLoading, isError } = useOrder();

  if (isLoading) {
    return <p className="text-gray-500">Loading orders...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load orders</p>;
  }

  // ✅ Split orders by status
  const inProgress = orders?.filter(
    (o: Order) => o.status === "processing" || o.status === "shipped"
  );
  const delivered = orders?.filter((o: Order) => o.status === "delivered");
  const cancelled = orders?.filter((o: Order) => o.status === "cancelled");

  return (
    <Tabs defaultValue="inProgress" className="w-full">
      {/* ---- Tabs Header ---- */}
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-auto">
        <TabsTrigger
          value="inProgress"
          className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3"
        >
          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">In Progress</span>
          <span className="sm:hidden">Progress</span>
          <span className="ml-1">({inProgress?.length || 0})</span>
        </TabsTrigger>

        <TabsTrigger
          value="delivered"
          className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3"
        >
          <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">Delivered</span>
          <span className="sm:hidden">Done</span>
          <span className="ml-1">({delivered?.length || 0})</span>
        </TabsTrigger>

        <TabsTrigger
          value="cancelled"
          className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3"
        >
          <XCircle className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">Cancelled</span>
          <span className="sm:hidden">Cancel</span>
          <span className="ml-1">({cancelled?.length || 0})</span>
        </TabsTrigger>
      </TabsList>

      {/* ---- In Progress ---- */}
      <TabsContent
        value="inProgress"
        className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
      >
        {inProgress?.length ? (
          inProgress.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No in-progress orders.</p>
        )}
      </TabsContent>

      {/* ---- Delivered ---- */}
      <TabsContent
        value="delivered"
        className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
      >
        {delivered?.length ? (
          delivered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No delivered orders.</p>
        )}
      </TabsContent>

      {/* ---- Cancelled ---- */}
      <TabsContent
        value="cancelled"
        className="space-y-3 lg:space-y-4 mt-4 lg:mt-6"
      >
        {cancelled?.length ? (
          cancelled.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No cancelled orders.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
