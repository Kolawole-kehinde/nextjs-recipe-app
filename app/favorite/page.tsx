import { Sidebar } from "@/features/dashboard/SideBar"
import { FavoriteContent} from "@/features/orders/favorite"

const WishlistPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <FavoriteContent />
    </div>
  )
}
export default WishlistPage
