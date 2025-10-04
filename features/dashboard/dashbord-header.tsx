"use client"

import { Input } from '@/components/ui/input'
import useUserStore from '@/store/useStore'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
  onSearch?: (query: string) => void; 
}

const DashboardHeader = ({ onSearch }: Props) => {
  const user = useUserStore((state) => state.user)
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  return (
    <header className="bg-white border-b px-4 lg:px-6 py-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm lg:text-base text-gray-600">
            Welcome back <span className='font-bold'>{user?.name}!</span> Here's what's happening with your orders.
          </p>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders, products..."
              className="pl-10 w-48 sm:w-64 lg:w-80"
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
