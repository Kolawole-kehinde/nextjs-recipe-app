
import { DashboardSidebar } from "../dashboard/SideBar"
import { OrdersOverview } from "../dashboard/orders-overview"
import { OrdersList } from "../dashboard/orders-list"


export default function OrdersPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Orders</h1>
              <p className="text-muted-foreground">Track and manage all your orders in one place</p>
            </div>

            {/* <OrdersOverview/> */}
            <OrdersList />
          </div>
        </main>
      </div>
    </div>
  )
}
