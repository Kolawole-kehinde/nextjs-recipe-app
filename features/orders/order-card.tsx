"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Truck, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Order } from "@/types/order"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 text-white text-xs">Delivered</Badge>
      case "processing":
        return <Badge className="bg-blue-500 text-white text-xs">Processing</Badge>
      case "shipped":
        return <Badge className="bg-orange-500 text-white text-xs">Shipped</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white text-xs">Cancelled</Badge>
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>
    }
  }

  const itemCount = order.order_items.reduce((sum, item) => sum + item.quantity, 0)
  const formattedDate = new Date(order.created_at).toLocaleDateString()

  return (
    <Card className="p-3">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-base">#{order.id}</h3>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{itemCount} items</p>
            </div>

            {getStatusBadge(order.order_status)}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/orders/${order.id}`} className="flex items-center gap-2">
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Track Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
