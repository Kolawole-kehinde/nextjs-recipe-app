// "use client";


// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { OrderCard } from "./order-card";
// import { useOrder } from "@/hooks/useOrders";

// export function OrdersList() {
//   const { orders, isLoading, isError } = useOrder();

//   if (isLoading) return <p>Loading orders...</p>;
//   if (isError) return <p>Failed to load orders</p>;

//   const inProgress = orders?.filter((o: any) =>
//     ["processing", "shipped"].includes(o.status)
//   );
//   const delivered = orders?.filter((o: any) => o.status === "delivered");
//   const cancelled = orders?.filter((o: any) => o.status === "cancelled");

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="inProgress" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="inProgress" className="flex items-center gap-2">
//             In Progress
//             <Badge variant="secondary">{inProgress?.length || 0}</Badge>
//           </TabsTrigger>
//           <TabsTrigger value="delivered" className="flex items-center gap-2">
//             Delivered
//             <Badge variant="secondary">{delivered?.length || 0}</Badge>
//           </TabsTrigger>
//           <TabsTrigger value="cancelled" className="flex items-center gap-2">
//             Cancelled
//             <Badge variant="secondary">{cancelled?.length || 0}</Badge>
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="inProgress" className="space-y-4">
//           {inProgress?.map((order: any) => (
//             <OrderCard key={order.id} order={order} />
//           ))}
//         </TabsContent>

//         <TabsContent value="delivered" className="space-y-4">
//           {delivered?.map((order: any) => (
//             <OrderCard key={order.id} order={order} />
//           ))}
//         </TabsContent>

//         <TabsContent value="cancelled" className="space-y-4">
//           {cancelled?.map((order: any) => (
//             <OrderCard key={order.id} order={order} />
//           ))}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
