"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashbordHeader from "../dashboard/dashbord-header"
import { Edit, Star, Trash2 } from "lucide-react"

const reviews = [
  {
    id: 1,
    productName: "Wireless Bluetooth Headphones",
    productImage: "/wireless-headphones.png",
    rating: 5,
    title: "Excellent sound quality!",
    content:
      "These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing. Highly recommend for anyone looking for premium wireless headphones.",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    status: "published",
  },
  {
    id: 2,
    productName: "Smart Fitness Watch",
    productImage: "/smart-fitness-watch.png",
    rating: 4,
    title: "Great fitness tracking features",
    content:
      "Love the fitness tracking capabilities and the heart rate monitor is very accurate. The only downside is the battery life could be better, but overall a solid purchase.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
    status: "published",
  },
  {
    id: 3,
    productName: "Portable Laptop Stand",
    productImage: "/laptop-stand.png",
    rating: 3,
    title: "Decent but could be sturdier",
    content:
      "The laptop stand does its job but feels a bit flimsy with heavier laptops. Good for light use but I wouldn't recommend for daily heavy usage.",
    date: "2024-01-05",
    verified: true,
    helpful: 3,
    status: "published",
  },
]

const pendingReviews = [
  {
    id: 4,
    productName: "Wireless Charging Pad",
    productImage: "/wireless-charging-pad.png",
    orderDate: "2024-01-20",
    status: "pending",
  },
]

export function ReviewsContent() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
     <DashbordHeader/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-gray-800" />
            <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          </div>

          <Tabs defaultValue="published" className="space-y-6">
            <TabsList>
              <TabsTrigger value="published">Published Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending Reviews ({pendingReviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.productImage || "/placeholder.svg"}
                          alt={review.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-lg">{review.productName}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">{review.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">{review.helpful} people found this helpful</span>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        Published
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingReviews.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productImage || "/placeholder.svg"}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            Purchased on {new Date(item.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button>
                        <Star className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pendingReviews.length === 0 && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reviews</h3>
                  <p className="text-gray-600">You're all caught up! Check back after your next purchase.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
