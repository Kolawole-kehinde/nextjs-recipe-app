
import { Sidebar } from "@/features/dashboard/SideBar"
import { OrderDetailsContent } from "@/features/orders/order-detail-content"

interface OrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <OrderDetailsContent orderId={params.id} />
    </div>
  )
}
