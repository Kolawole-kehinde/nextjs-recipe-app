"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OrdersTabs } from "./order-tabs"

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-600 rounded" />
              </div>
              <span className="text-xl font-bold text-gray-900">EcomDash</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search orders, products..." className="pl-10 w-48 sm:w-64 lg:w-80" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gray-800 rounded flex items-center justify-center">
              <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 border border-gray-400 rounded-sm" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Orders</h1>
          </div>

          <OrdersTabs />
        </div>
      </main>
    </div>
  )
}
