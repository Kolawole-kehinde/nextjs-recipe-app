"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, MoreHorizontal, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"


function OrderCard({ order, showReason = false }: { order: any; showReason?: boolean }) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/orders/${order.id}`)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 bg-muted rounded-lg flex-shrink-0">
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-base">{order.id}</h3>
              <p className="text-sm text-muted-foreground truncate">{order.customer}</p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
            <div className="text-left sm:text-right">
              <p className="font-semibold text-sm sm:text-base">{order.total}</p>
              <p className="text-sm text-muted-foreground">{order.items} items</p>
              {showReason && order.reason && <p className="text-xs text-destructive">{order.reason}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Badge className={`${order.statusColor} text-xs`}>{order.status}</Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleViewDetails}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Truck className="mr-2 h-4 w-4" />
                    Track Order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function OrdersList() {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
          <Package className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs defaultValue="inProgress" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger
              value="inProgress"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm p-2 sm:p-3"
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">In Progress</span>
              <span className="sm:hidden">Progress</span>
              <span className="text-xs">({mockOrders.inProgress.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm p-2 sm:p-3"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Delivered</span>
              <span className="text-xs">({mockOrders.delivered.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm p-2 sm:p-3"
            >
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Cancelled</span>
              <span className="text-xs">({mockOrders.cancelled.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inProgress" className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            {mockOrders.inProgress?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            {mockOrders.delivered?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            {mockOrders.cancelled?.map((order) => (
              <OrderCard key={order.id} order={order} showReason />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
