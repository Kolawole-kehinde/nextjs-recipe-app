"use client"

import { ArrowLeft, Search, Bell, Truck, MapPin, CreditCard, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface OrderDetailsContentProps {
  orderId: string
}

// Mock order data
const mockOrderDetails = {
  "ORD-004": {
    id: "ORD-004",
    customerName: "David Wilson",
    customerEmail: "david.wilson@email.com",
    customerPhone: "+1 (555) 123-4567",
    date: "2024-01-10",
    status: "delivered",
    total: 449.99,
    subtotal: 399.99,
    shipping: 25.0,
    tax: 25.0,
    trackingNumber: "TRK123456789",
    deliveredDate: "2024-01-15",
    shippingAddress: {
      name: "David Wilson",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
    },
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        image: "/wireless-headphones.png",
        price: 199.99,
        quantity: 1,
        sku: "WBH-001",
      },
      {
        id: 2,
        name: "USB-C Charging Cable",
        image: "/placeholder-lppyz.png",
        price: 29.99,
        quantity: 2,
        sku: "USB-C-001",
      },
      {
        id: 3,
        name: "Phone Case - Clear",
        image: "/placeholder-lppyz.png",
        price: 19.99,
        quantity: 1,
        sku: "PC-CLR-001",
      },
      {
        id: 4,
        name: "Screen Protector",
        image: "/placeholder-lppyz.png",
        price: 14.99,
        quantity: 1,
        sku: "SP-001",
      },
    ],
    timeline: [
      { status: "Order Placed", date: "2024-01-10", time: "10:30 AM", completed: true },
      { status: "Payment Confirmed", date: "2024-01-10", time: "10:32 AM", completed: true },
      { status: "Processing", date: "2024-01-11", time: "9:00 AM", completed: true },
      { status: "Shipped", date: "2024-01-12", time: "2:15 PM", completed: true },
      { status: "Out for Delivery", date: "2024-01-15", time: "8:00 AM", completed: true },
      { status: "Delivered", date: "2024-01-15", time: "3:45 PM", completed: true },
    ],
  },
}

export function OrderDetailsContent({ orderId }: OrderDetailsContentProps) {
  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails]

  if (!order) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-4">The order {orderId} could not be found.</p>
            <Link href="/">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Delivered</Badge>
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Processing</Badge>
      case "shipped":
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Shipped</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-600 rounded" />
              </div>
              <span className="text-xl font-bold text-gray-900">EcomDash</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search orders, products..." className="pl-10 w-80" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>DW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Order Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{order.id}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          {getStatusBadge(order.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${event.completed ? "bg-green-500" : "bg-gray-300"}`} />
                      <div className="flex-1">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-600">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {order.paymentMethod.brand} ending in {order.paymentMethod.last4}
                </p>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{order.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{order.customerPhone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <Truck className="w-4 h-4 mr-2" />
                Track Package
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Download Invoice
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
