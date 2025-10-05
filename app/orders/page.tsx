import { Sidebar } from "@/features/dashboard/SideBar";
import { MainContent } from "@/features/orders";



export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <MainContent/>
      </div>
    </div>
  )
}
