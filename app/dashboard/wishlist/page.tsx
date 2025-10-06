import { Sidebar } from "@/features/dashboard/SideBar"
import { WishlistItems } from "@/features/orders/wishlist"


const WishlistPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <WishlistItems />
    </div>
  )
}
export default WishlistPage
