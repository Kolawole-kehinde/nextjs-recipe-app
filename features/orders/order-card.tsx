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

interface Product {
  id: string
  name: string
  price: number
  image_url?: string
}

interface OrderItem {
  id: string
  quantity: number
  products: Product
}

export interface Order {
  id: string
  created_at: string
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"  // ✅ comes from order_status in DB
  order_items: OrderItem[]
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs">Delivered</Badge>
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs">Processing</Badge>
      case "shipped":
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">Shipped</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">Cancelled</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const itemCount = order.order_items.reduce((sum, item) => sum + item.quantity, 0)
  const formattedDate = new Date(order.created_at).toLocaleDateString()

  return (
    <Card className="p-3 lg:p-4">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-gray-400 rounded-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-base lg:text-lg">#{order.id}</h3>
              <p className="text-xs lg:text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
            <div className="text-left sm:text-right">
              <p className="text-lg lg:text-xl font-bold">${order.total.toFixed(2)}</p>
              <p className="text-xs lg:text-sm text-gray-500">{itemCount} items</p>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              {getStatusBadge(order.status)}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 lg:w-10 lg:h-10"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/orders/${order.id}`} className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
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
