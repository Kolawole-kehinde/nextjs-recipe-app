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
import { normalizeStatus } from "@/utils/status"
import { Separator } from "@/components/ui/separator"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusBadge = (status: string) => {
    switch (normalizeStatus(status)) {
      case "delivered":
        return <Badge className="bg-green-500 text-white text-xs">Delivered</Badge>
      case "processing":
      case "in progress":
        return <Badge className="bg-blue-500 text-white text-xs">In Progress</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white text-xs">Cancelled</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const formattedDate = new Date(order.created_at).toLocaleDateString()

  return (
    <Card className="p-5">
      <CardContent className="p-4">
        {/* ✅ Mobile: Two rows */}
       {/* ✅ Mobile: Two rows */}
<div className="flex flex-col sm:hidden space-y-3">
  {/* Row 1: Order ID + Date */}
  <div className="flex items-center justify-between">
    <h3 className="font-semibold text-base">#{order.id}</h3>
    <p className="text-sm text-gray-500">{formattedDate}</p>
  </div>

  {/* 🔹 Separator for mobile */}
  <Separator />

  {/* Row 2: Price | Status | 3 dots */}
  <div className="flex items-center justify-between">
    <p className="text-lg font-bold">${order.total_price.toFixed(2)}</p>
    <div className="flex-1 flex justify-center">
      {getStatusBadge(order.order_status)}
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/orders/${order.id}`}
            className="flex items-center gap-2"
          >
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


        {/* ✅ md+ screens: Original layout untouched */}
        <div className="hidden sm:flex flex-row items-center justify-between gap-3">
          {/* Left side (order info) */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
            </div>
            <div className="space-y-2.5">
              <h3 className="font-semibold text-base">#{order.id}</h3>
              <p className="text-base text-gray-500">{formattedDate}</p>
            </div>
          </div>

          <Separator className="hidden sm:block text-red-700" />

          {/* Right side (price + badge + actions) */}
          <div className="flex items-center gap-3">
            <div className="flex flex-row space-x-10 md:space-x-0 md:flex-col items-center text-right">
              <p className="text-lg font-bold">${order.total_price.toFixed(2)}</p>
              <div className="mt-1">{getStatusBadge(order.order_status)}</div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center gap-2"
                  >
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
