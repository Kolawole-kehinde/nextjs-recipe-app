"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Package,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { navigation } from "@/constants/sidebar"



export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-teal-600 text-white rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-cyan-400 to-teal-600 text-white transform transition-all duration-300 ease-in-out lg:transform-none",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          "w-64", // Mobile always full width
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className={cn("p-6", isCollapsed && "lg:p-4")}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-teal-600" />
            </div>
            <span className={cn("text-xl font-bold transition-opacity duration-300", isCollapsed && "lg:hidden")}>
              EcomDash
            </span>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-3 top-8">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-teal-600 hover:bg-gray-50 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className={cn("px-4 space-y-1", isCollapsed && "lg:px-2")}>
          {navigation?.map((item) => {
            const isActive = pathname === item.href || (item.href === "/orders" && pathname.startsWith("/orders"))
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors relative group",
                  isCollapsed ? "lg:px-2 lg:py-3 lg:justify-center" : "px-4 py-3",
                  isActive ? "bg-purple-600 text-white" : "text-white/80 hover:text-white hover:bg-white/10",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn("transition-opacity duration-300", isCollapsed && "lg:hidden")}>{item.name}</span>

                {isCollapsed && (
                  <div className="hidden lg:group-hover:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
