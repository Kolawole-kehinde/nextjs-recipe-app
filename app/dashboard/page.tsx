import { DashboardOverview } from "@/features/dashboard/DashboardOverview.tsx";
import { Sidebar } from "@/features/dashboard/SideBar";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <DashboardOverview/>
      </div>
    </div>
  )
}
