"use client"

import { useState } from "react"
import { Package, Heart, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "./dashbord-header"
import { useOrder } from "@/hooks/useOrders"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentOrders } from "./RecentOrders"

export function DashboardOverview() {
  const { orders, isLoading, isError, error } = useOrder()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    console.log("Search input:", value)
  }

  const totalOrders = orders?.length ?? 0
  const inProgressOrders =
    orders?.filter((o: Order) => o.order_status === "In Progress").length ?? 0
  const deliveredItems =
    orders?.filter((o: Order) => o.order_status === "Delivered").length ?? 0

  return (
    <div className="flex-1 flex flex-col">
      <DashboardHeader
        title="Dashboard"
        searchPlaceholder="Search orders, products..."
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 overflow-x-auto">
            {/* Total Orders */}
            <Card className="bg-[#dbeafe]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <CardTitle className="text-xs lg:text-sm font-medium">
                    Total Orders
                  </CardTitle>
                )}

                {isLoading ? (
                  <Skeleton className="h-4 w-4 rounded" />
                ) : (
                  <Package className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-16 rounded" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </>
                ) : isError ? (
                  <div className="text-sm text-red-500">
                    {error?.message || "Error"}
                  </div>
                ) : (
                  <>
                    <div className="text-lg lg:text-2xl font-bold">
                      {totalOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* In Progress */}
            <Card className="bg-[#fef9c3]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <CardTitle className="text-xs lg:text-sm font-medium">
                    In Progress
                  </CardTitle>
                )}

                {isLoading ? (
                  <Skeleton className="h-4 w-4 rounded" />
                ) : (
                  <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-12 rounded" />
                    <Skeleton className="h-3 w-28 mt-2" />
                  </>
                ) : (
                  <>
                    <div className="text-lg lg:text-2xl font-bold">
                      {inProgressOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently processing
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Delivered */}
            <Card className="bg-[#dcfce7]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-28" />
                ) : (
                  <CardTitle className="text-xs lg:text-sm font-medium">
                    Delivered
                  </CardTitle>
                )}

                {isLoading ? (
                  <Skeleton className="h-4 w-4 rounded" />
                ) : (
                  <Heart className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-12 rounded" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </>
                ) : (
                  <>
                    <div className="text-lg lg:text-2xl font-bold">
                      {deliveredItems}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Items Delivered
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <RecentOrders />
        </div>
      </main>
    </div>
  )
}

export interface Order {
  id: string
  code: string
  order_status: string
  total_amount: number
  created_at: string
  items?: { id: string; name: string }[]
  is_wishlist?: boolean
}
