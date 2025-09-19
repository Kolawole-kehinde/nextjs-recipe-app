// "use client";

// import { useState } from "react";
// import { Toaster } from "react-hot-toast";
// import { AlertDialog } from "@/components/AlertDialog";
// import { Button } from "@/components/ui/button";
// import { Order } from "@/types/order";
// import { useOrder } from "@/hooks/useOrders";

// const OrderDetails = () => {
//   const {orders, isLoading, isError, error, cancel, isCancelling } = useOrder();
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

//   const handleCancel = async () => {
//     if (!selectedOrderId) return;
//     cancel(selectedOrderId);
//     setSelectedOrderId(null);
//   };

//   const filteredOrders: Order[] =
//     orders?.filter((order: any) => order.order_status !== "cancelled") || [];

//   if (isLoading) return <div className="text-center py-10">Loading your orders...</div>;
//   if (isError)
//     return (
//       <div className="text-center text-red-500 py-10">
//         {typeof error === "string" ? error : (error as any)?.message}
//       </div>
//     );
//   if (!orders?.length) return <div className="text-center py-10">No orders yet.</div>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <Toaster position="top-center" />
//       <h1 className="text-3xl font-bold text-start mb-6">Your Orders</h1>

//       <div className="space-y-8">
//         {filteredOrders.map((order) => (
//           <div key={order.id} className="bg-white shadow rounded-xl p-6 border">
//             <div className="mb-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-700">
//                 Order ID: <span className="text-gray-900">{order.id}</span>
//               </h2>
//               {["pending", "processing"].includes(order.order_status) && (
//                 <Button
//                   onClick={() => setSelectedOrderId(order.id)}
//                   disabled={isCancelling}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                 >
//                   {isCancelling ? "Cancelling..." : "Cancel Order"}
//                 </Button>
//               )}
//             </div>
//             <p className="text-sm text-gray-500">Status: {order.order_status}</p>
//             <p className="text-sm text-gray-500">
//               Placed on: {new Date(order.created_at).toLocaleDateString()}
//             </p>

//             <div>
//               {order.order_items?.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center justify-between border-t pt-4"
//                 >
//                   <img
//                     src={item.product.image_url}
//                     alt={item.product.name}
//                     className="w-20 h-20 object-cover rounded-md border"
//                   />
//                   <div>
//                     <h3 className="text-md font-medium text-gray-800">
//                       {item.product.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                     <p className="text-sm text-gray-600">
//                       Price: ${item.product.price.toFixed(2)}
//                     </p>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Total: ${(item.quantity * item.product.price).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <AlertDialog
//         open={!!selectedOrderId}
//         onOpenChange={(open) => !open && setSelectedOrderId(null)}
//         title="Cancel Order"
//         description="Are you sure you want to cancel this order?"
//         confirmText="Yes, Cancel"
//         cancelText="No, Keep"
//         onConfirm={handleCancel}
//         onCancel={() => setSelectedOrderId(null)}
//       />
//     </div>
//   );
// };

// export default OrderDetails;
