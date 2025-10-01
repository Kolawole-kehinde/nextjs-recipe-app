"use client";

import {
  ArrowLeft, Search, Bell, MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useOrder } from "@/hooks/useOrders";

interface OrderDetailsContentProps {
  orderId: string;
}

export function OrderDetailsContent({ orderId }: OrderDetailsContentProps) {
  const { orders, isLoading, isError, cancel, isCancelling } = useOrder();

  if (isLoading) return <p className="p-6">Loading order details...</p>;
  if (isError || !orders) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load order</h2>
          <p className="text-gray-600 mb-4">Please try again or go back to your orders.</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const order = orders.find((o: any) => o.id === orderId);

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order {orderId} could not be found.</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Delivered</Badge>;
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Processing</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const subtotal = order.order_items?.reduce(
    (sum: number, item: any) => sum + (item.products?.price || 0) * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/orders">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search orders, products..." className="pl-10 w-80" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Order Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
            <p className="text-gray-500 text-sm">
              Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(order.order_status)}
            {order.order_status !== "delivered" && order.order_status !== "cancelled" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => cancel(order.id)}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Order"}
              </Button>
            )}

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({order.order_items?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.products?.image_url || "/placeholder.svg"}
                      alt={item.products?.name || "Product"}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.products?.name || "Unnamed Product"}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₦{(item.products?.price || 0) * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{total}</span>
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
                <p>{order.shipping_address || "Not provided"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
