"use client"

import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import FoodItems from "@/components/FoodItems"
import DashboardHeader from "../dashboard/dashbord-header"
import { RecommendedDishes } from "@/components/LadingPage/RecommendedDishes"
import { useWishlist, useToggleWishlist, useAddToCart } from "@/hooks/useCart"
import { notify } from "@/helpers/notifications"

export function WishlistItems() {
  const wishlist = useWishlist()
  const toggleWishlist = useToggleWishlist()
  const addToCart = useAddToCart()

  const handleRemove = (food: any) => {
    toggleWishlist(food)
    notify.wishlist.removed(food.name)
  }

  const handleAddAllToCart = () => {
    wishlist.forEach((food) => addToCart({ ...food, quantity: 1 }))
    notify.cart.allAdded()
  }

  return (
    <div className="flex-1 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Top header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-gray-800" />
              <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
              <span className="text-gray-600">({wishlist.length} items)</span>
            </div>

            {wishlist.length > 0 && (
              <Button variant="outline" onClick={handleAddAllToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
            )}
          </div>

          {/* Wishlist Items */}
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((food) => (
                <FoodItems
                  key={food.id}
                  {...food}
                  onRemove={() => handleRemove(food)}
                  showRemoveButton
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-4">
                Save food items you love to buy them later
              </p>
              <Link href="/">
                <Button className="bg-orange-500">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <RecommendedDishes />
    </div>
  )
}
