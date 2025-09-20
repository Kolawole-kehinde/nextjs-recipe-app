// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Progress } from "@/components/ui/progress"
// import {
//   Package,
//   Truck,
//   CheckCircle,
//   XCircle,
//   MapPin,
//   CreditCard,
//   MessageCircle,
//   Download,
//   RotateCcw,
//   Star,
// } from "lucide-react"

// interface OrderDetailsViewProps {
//   orderId: string
// }

// // Mock data - in real app this would come from API
// const getOrderDetails = (orderId: string) => {
//   const orders = {
//     "ORD-004": {
//       id: "ORD-004",
//       date: "2024-01-10",
//       status: "delivered",
//       deliveredDate: "2024-01-15",
//       trackingNumber: "1Z999AA1234567890",
//       carrier: "UPS",
//       total: 449.99,
//       subtotal: 399.99,
//       shipping: 29.99,
//       tax: 20.01,
//       items: [
//         {
//           id: "1",
//           name: "Wireless Bluetooth Headphones",
//           image: "/wireless-headphones.png",
//           quantity: 1,
//           price: 199.99,
//           sku: "WBH-001",
//         },
//         {
//           id: "2",
//           name: "Smartphone Case - Clear",
//           image: "/placeholder-lppyz.png",
//           quantity: 2,
//           price: 100.0,
//           sku: "SPC-002",
//         },
//       ],
//       shippingAddress: {
//         name: "David Wilson",
//         street: "123 Main Street",
//         city: "New York",
//         state: "NY",
//         zip: "10001",
//         country: "United States",
//       },
//       billingAddress: {
//         name: "David Wilson",
//         street: "123 Main Street",
//         city: "New York",
//         state: "NY",
//         zip: "10001",
//         country: "United States",
//       },
//       paymentMethod: {
//         type: "Visa",
//         last4: "4242",
//         expiry: "12/26",
//       },
//       timeline: [
//         { status: "Order Placed", date: "2024-01-10", completed: true },
//         { status: "Processing", date: "2024-01-11", completed: true },
//         { status: "Shipped", date: "2024-01-12", completed: true },
//         { status: "Out for Delivery", date: "2024-01-15", completed: true },
//         { status: "Delivered", date: "2024-01-15", completed: true },
//       ],
//     },
//   }

//   return orders[orderId as keyof typeof orders] || null
// }

// export function OrderDetailsView({ orderId }: OrderDetailsViewProps) {
//   const order = getOrderDetails(orderId)

//   if (!order) {
//     return (
//       <div className="text-center py-12">
//         <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//         <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
//         <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
//       </div>
//     )
//   }

//   const getStatusConfig = (status: string) => {
//     switch (status) {
//       case "processing":
//         return {
//           icon: Package,
//           label: "Processing",
//           color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
//           progress: 25,
//         }
//       case "shipped":
//         return {
//           icon: Truck,
//           label: "Shipped",
//           color:
//             "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
//           progress: 50,
//         }
//       case "delivered":
//         return {
//           icon: CheckCircle,
//           label: "Delivered",
//           color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
//           progress: 100,
//         }
//       case "cancelled":
//         return {
//           icon: XCircle,
//           label: "Cancelled",
//           color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
//           progress: 0,
//         }
//       default:
//         return {
//           icon: Package,
//           label: "Unknown",
//           color: "bg-muted text-muted-foreground",
//           progress: 0,
//         }
//     }
//   }

//   const statusConfig = getStatusConfig(order.status)
//   const StatusIcon = statusConfig.icon

//   return (
//     <div className="space-y-6">
//       {/* Order Status Header */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-2xl">{order.id}</CardTitle>
//               <p className="text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <Badge variant="outline" className={`${statusConfig.color} text-sm px-3 py-1`}>
//               <StatusIcon className="w-4 h-4 mr-2" />
//               {statusConfig.label}
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between text-sm mb-2">
//                 <span>Order Progress</span>
//                 <span>{statusConfig.progress}%</span>
//               </div>
//               <Progress value={statusConfig.progress} className="h-2" />
//             </div>

//             {/* Order Timeline */}
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
//               {order.timeline.map((step, index) => (
//                 <div key={index} className="text-center">
//                   <div
//                     className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
//                       step.completed ? "bg-chart-1 text-white" : "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {step.completed ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : (
//                       <div className="w-2 h-2 rounded-full bg-current" />
//                     )}
//                   </div>
//                   <p className="text-xs font-medium">{step.status}</p>
//                   <p className="text-xs text-muted-foreground">{new Date(step.date).toLocaleDateString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Order Items */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Items</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {order.items.map((item) => (
//                 <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
//                   <img
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded-md"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-semibold">{item.name}</h4>
//                     <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
//                     <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold">${item.price.toFixed(2)}</p>
//                     {order.status === "delivered" && (
//                       <Button variant="outline" size="sm" className="mt-2 bg-transparent">
//                         <Star className="w-3 h-3 mr-1" />
//                         Review
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Shipping & Tracking */}
//           {order.trackingNumber && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Truck className="w-5 h-5" />
//                   Shipping & Tracking
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium">Tracking Number</p>
//                     <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Carrier</p>
//                     <p className="text-sm text-muted-foreground">{order.carrier}</p>
//                   </div>
//                 </div>
//                 <Button variant="outline" className="w-full bg-transparent">
//                   <Truck className="w-4 h-4 mr-2" />
//                   Track Package
//                 </Button>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* Order Summary & Actions */}
//         <div className="space-y-6">
//           {/* Order Summary */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${order.subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>${order.shipping.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>${order.tax.toFixed(2)}</span>
//               </div>
//               <Separator />
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Total</span>
//                 <span>${order.total.toFixed(2)}</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Button className="w-full bg-transparent" variant="outline">
//                 <Download className="w-4 h-4 mr-2" />
//                 Download Invoice
//               </Button>
//               {order.status === "delivered" && (
//                 <Button className="w-full bg-transparent" variant="outline">
//                   <RotateCcw className="w-4 h-4 mr-2" />
//                   Reorder Items
//                 </Button>
//               )}
//               <Button className="w-full bg-transparent" variant="outline">
//                 <MessageCircle className="w-4 h-4 mr-2" />
//                 Contact Support
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Shipping Address */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5" />
//                 Shipping Address
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-sm space-y-1">
//                 <p className="font-medium">{order.shippingAddress.name}</p>
//                 <p>{order.shippingAddress.street}</p>
//                 <p>
//                   {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
//                 </p>
//                 <p>{order.shippingAddress.country}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Payment Method */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CreditCard className="w-5 h-5" />
//                 Payment Method
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-sm">
//                 <p className="font-medium">
//                   {order.paymentMethod.type} ending in {order.paymentMethod.last4}
//                 </p>
//                 <p className="text-muted-foreground">Expires {order.paymentMethod.expiry}</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
