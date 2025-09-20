"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DashbordHeader from "../dashboard/dashbord-header"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

const wishlistItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 159.99,
    image: "/wireless-headphones.png",
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    originalPrice: 349.99,
    image: "/smart-fitness-watch.png",
    inStock: true,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 3,
    name: "Portable Laptop Stand",
    price: 49.99,
    originalPrice: 69.99,
    image: "/laptop-stand.png",
    inStock: false,
    rating: 4.3,
    reviews: 89,
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 49.99,
    image: "/wireless-charging-pad.png",
    inStock: true,
    rating: 4.6,
    reviews: 312,
  },
]

export function FavoriteContent() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <DashbordHeader/>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-gray-800" />
              <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
              <span className="text-gray-600">({wishlistItems.length} items)</span>
            </div>
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </Button>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({item.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      disabled={!item.inStock}
                      variant={item.inStock ? "default" : "secondary"}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Notify When Available"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State (if no items) */}
          {wishlistItems.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Save items you love to buy them later</p>
              <Button>Start Shopping</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
