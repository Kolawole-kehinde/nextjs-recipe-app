"use client"
// import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/features/dashboard/SideBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, ShoppingCart, DollarSign, Users, Eye } from "lucide-react"
import { stats } from "@/constants/dashboardStats"

export default function DashboardPage() {

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your store today.</p>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {stats?.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest store activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-muted-foreground">Order #12345 - $89.99</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Product updated</p>
                        <p className="text-xs text-muted-foreground">Wireless Headphones - Stock updated</p>
                      </div>
                      <span className="text-xs text-muted-foreground">5 min ago</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment processed</p>
                        <p className="text-xs text-muted-foreground">Order #12344 - $156.50</p>
                      </div>
                      <span className="text-xs text-muted-foreground">10 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                    <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Add Product</span>
                    </button>
                    <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <Eye className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">View Orders</span>
                    </button>
                    <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Analytics</span>
                    </button>
                    <button className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Payments</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
