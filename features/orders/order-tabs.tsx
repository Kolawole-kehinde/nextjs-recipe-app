"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { OrderCard } from "./order-card"

const mockOrders = {
  inProgress: [
    {
      id: "ORD-001",
      customerName: "John Smith",
      date: "2024-01-15",
      total: 299.99,
      itemCount: 2,
      status: "processing",
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      date: "2024-01-14",
      total: 159.99,
      itemCount: 1,
      status: "shipped",
    },
    {
      id: "ORD-003",
      customerName: "Mike Davis",
      date: "2024-01-13",
      total: 89.99,
      itemCount: 3,
      status: "processing",
    },
  ],
  delivered: [
    {
      id: "ORD-004",
      customerName: "David Wilson",
      date: "2024-01-10",
      total: 449.99,
      itemCount: 4,
      status: "delivered",
    },
    {
      id: "ORD-005",
      customerName: "Eva Brown",
      date: "2024-01-09",
      total: 199.99,
      itemCount: 2,
      status: "delivered",
    },
  ],
  cancelled: [
    {
      id: "ORD-006",
      customerName: "Tom Wilson",
      date: "2024-01-08",
      total: 79.99,
      itemCount: 1,
      status: "cancelled",
    },
  ],
}

export function OrdersTabs() {
  return (
    <Tabs defaultValue="inProgress" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100 h-auto">
        <TabsTrigger value="inProgress" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">In Progress</span>
          <span className="sm:hidden">Progress</span>
          <span className="ml-1">({mockOrders.inProgress.length})</span>
        </TabsTrigger>
        <TabsTrigger value="delivered" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
          <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">Delivered</span>
          <span className="sm:hidden">Done</span>
          <span className="ml-1">({mockOrders.delivered.length})</span>
        </TabsTrigger>
        <TabsTrigger value="cancelled" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
          <XCircle className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">Cancelled</span>
          <span className="sm:hidden">Cancel</span>
          <span className="ml-1">({mockOrders.cancelled.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inProgress" className="space-y-3 lg:space-y-4 mt-4 lg:mt-6">
        {mockOrders.inProgress.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </TabsContent>

      <TabsContent value="delivered" className="space-y-3 lg:space-y-4 mt-4 lg:mt-6">
        {mockOrders.delivered.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </TabsContent>

      <TabsContent value="cancelled" className="space-y-3 lg:space-y-4 mt-4 lg:mt-6">
        {mockOrders.cancelled.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
