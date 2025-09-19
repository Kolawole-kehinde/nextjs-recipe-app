"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "./order-card"


// Mock data for orders
const mockOrders = {
  inProgress: [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 199.99 },
        { name: "Phone Case", quantity: 2, price: 29.99 },
      ],
      total: 259.97,
      status: "processing",
      estimatedDelivery: "2024-01-20",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2024-01-18",
      items: [{ name: "Gaming Mouse", quantity: 1, price: 79.99 }],
      total: 79.99,
      status: "shipped",
      estimatedDelivery: "2024-01-22",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      date: "2024-01-20",
      items: [
        { name: "Laptop Stand", quantity: 1, price: 49.99 },
        { name: "USB Cable", quantity: 3, price: 12.99 },
      ],
      total: 88.96,
      status: "processing",
      estimatedDelivery: "2024-01-25",
      trackingNumber: "TRK456789123",
    },
  ],
  delivered: [
    {
      id: "ORD-004",
      date: "2024-01-10",
      items: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
      total: 89.99,
      status: "delivered",
      deliveredDate: "2024-01-14",
      trackingNumber: "TRK111222333",
    },
    {
      id: "ORD-005",
      date: "2024-01-05",
      items: [
        { name: "Smartwatch", quantity: 1, price: 299.99 },
        { name: "Watch Band", quantity: 1, price: 39.99 },
      ],
      total: 339.98,
      status: "delivered",
      deliveredDate: "2024-01-09",
      trackingNumber: "TRK444555666",
    },
  ],
  cancelled: [
    {
      id: "ORD-006",
      date: "2024-01-12",
      items: [{ name: "Tablet", quantity: 1, price: 399.99 }],
      total: 399.99,
      status: "cancelled",
      cancelledDate: "2024-01-13",
      reason: "Customer request",
    },
  ],
}

export function OrdersList(order:any) {
  const [activeTab, setActiveTab] = useState("inProgress")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inProgress" className="flex items-center gap-2">
            In Progress
            <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
              {mockOrders.inProgress.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center gap-2">
            Delivered
            <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
              {mockOrders.delivered.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            Cancelled
            <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
              {mockOrders.cancelled.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inProgress" className="space-y-4">
          <div className="grid gap-4">
            {mockOrders.inProgress.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <div className="grid gap-4">
            {mockOrders.delivered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="grid gap-4">
            {mockOrders.cancelled.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
