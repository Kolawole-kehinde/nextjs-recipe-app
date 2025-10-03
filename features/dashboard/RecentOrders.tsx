"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Package } from "lucide-react"
import Link from "next/link"
import { useOrder } from "@/hooks/useOrders"

export function RecentOrders() {
  const { orders, isLoading, isError, error } = useOrder()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="h-5 w-32" />
          ) : (
            <CardTitle className="text-lg lg:text-xl">Recent Orders</CardTitle>
          )}

          {isLoading ? (
            <Skeleton className="h-8 w-20 rounded" />
          ) : (
            <Link href="/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 lg:space-y-4">
          {isLoading ? (
            // 🔥 Skeleton placeholders
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 lg:p-4 border rounded-lg"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="text-sm text-red-500">{error?.message || "Error loading orders"}</div>
          ) : (
            orders?.slice(0, 3).map((order: any) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 lg:p-4 border rounded-lg"
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm lg:text-base">{order.code}</p>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {order.items?.length ?? 0} items • ${order.total_amount ?? 0}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {order.order_status}
                  </span>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
