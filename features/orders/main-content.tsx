"use client"

import { OrdersTabs } from "./order-tabs"
import DashbordHeader from "../dashboard/dashbord-header"

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      <DashbordHeader/>

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
