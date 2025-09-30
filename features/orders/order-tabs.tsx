"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { OrderCard } from "./order-card"
import { useOrder } from "@/hooks/useOrders"
import type { Order } from "@/types/order"
import { normalizeStatus } from "@/utils/status"

export function OrdersTabs() {
  const { orders, isLoading, isError } = useOrder()

  if (isLoading) {
    return <p className="text-gray-500">Loading orders...</p>
  }

  if (isError) {
    return <p className="text-red-500">Failed to load orders</p>
  }

  const inProgress = orders?.filter((o: Order) => {
    const status = normalizeStatus(o.order_status)
    return ["processing", "shipped", "in progress"].includes(status)
  })

  const delivered = orders?.filter(
    (o: Order) => normalizeStatus(o.order_status) === "delivered"
  )

  const cancelled = orders?.filter(
    (o: Order) => normalizeStatus(o.order_status) === "cancelled"
  )

  return (
    <Tabs defaultValue="inProgress" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-auto">
        <TabsTrigger value="inProgress" className="flex items-center gap-2 text-sm p-2">
          <Clock className="w-4 h-4" />
          Progress ({inProgress?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="delivered" className="flex items-center gap-2 text-sm p-2">
          <CheckCircle className="w-4 h-4" />
          Delivered ({delivered?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="cancelled" className="flex items-center gap-2 text-sm p-2">
          <XCircle className="w-4 h-4" />
          Cancelled ({cancelled?.length || 0})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inProgress" className="space-y-3 mt-4">
        {inProgress?.length ? (
          inProgress.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="text-gray-500 text-sm">No in-progress orders.</p>
        )}
      </TabsContent>

      <TabsContent value="delivered" className="space-y-3 mt-4">
        {delivered?.length ? (
          delivered.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="text-gray-500 text-sm">No delivered orders.</p>
        )}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-3 mt-4">
        {cancelled?.length ? (
          cancelled.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p className="text-gray-500 text-sm">No cancelled orders.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
