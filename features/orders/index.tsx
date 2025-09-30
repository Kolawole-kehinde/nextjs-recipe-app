// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Package, Truck, CheckCircle, XCircle } from "lucide-react"

// export function OrdersOverview() {
//   const stats = [
//     {
//       title: "Total Orders",
//       value: "24",
//       icon: Package,
//       color: "text-foreground",
//     },
//     {
//       title: "In Progress",
//       value: "8",
//       icon: Truck,
//       color: "text-chart-2",
//     },
//     {
//       title: "Delivered",
//       value: "14",
//       icon: CheckCircle,
//       color: "text-chart-1",
//     },
//     {
//       title: "Cancelled",
//       value: "2",
//       icon: XCircle,
//       color: "text-chart-3",
//     },
//   ]

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       {stats.map((stat) => {
//         const Icon = stat.icon
//         return (
//           <Card key={stat.title} className="transition-all hover:shadow-md">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
//               <Icon className={`h-5 w-5 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }
