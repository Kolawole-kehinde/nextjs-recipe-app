import { Sidebar } from "@/features/dashboard/SideBar";
import { ReviewsContent } from "@/features/orders/reviews";


export default function ReviewsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ReviewsContent />
    </div>
  )
}
