"use client"

import { Search, Package, Heart, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import DashbordHeader from "./dashbord-header"
import { useOrder } from "@/hooks/useOrders"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardOverview() {
  const { orders, isLoading, isError, error } = useOrder();

  return (
    <div className="flex-1 flex flex-col">
       <DashbordHeader/>
      <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-6">

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
           <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-xs lg:text-sm font-medium">Total Orders</CardTitle>
    <Package className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    {isLoading ? (
      <Skeleton className="h-6 w-16 rounded" />
    ) : isError ? (
      <div className="text-sm text-red-500">{error?.message || "Error"}</div>
    ) : (
      <div className="text-lg lg:text-2xl font-bold">
        {orders?.length ?? 0}
      </div>
    )}
    <p className="text-xs text-muted-foreground">+2 from last month</p>
  </CardContent>
</Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Currently processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium">Wishlist Items</CardTitle>
                <Heart className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Items saved</p>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold">$2,847</div>
                <p className="text-xs text-muted-foreground">This year</p>
              </CardContent>
            </Card> */}
          </div>




          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg lg:text-xl">Recent Orders</CardTitle>
                <Link href="/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center justify-between p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm lg:text-base">ORD-004</p>
                      <p className="text-xs lg:text-sm text-gray-600">4 items • $449.99</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Delivered
                    </span>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">Jan 10, 2024</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm lg:text-base">ORD-005</p>
                      <p className="text-xs lg:text-sm text-gray-600">2 items • $199.99</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Delivered
                    </span>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">Jan 9, 2024</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm lg:text-base">ORD-003</p>
                      <p className="text-xs lg:text-sm text-gray-600">1 item • $89.99</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                    <p className="text-xs lg:text-sm text-gray-600 mt-1">Jan 8, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
