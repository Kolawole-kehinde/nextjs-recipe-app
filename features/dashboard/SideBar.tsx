"use client"

import { useState, useEffect } from "react"
import {ChevronLeft, ChevronRight,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarItems } from "@/constants/sidebar"


export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <>
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div
        className={cn(
          "relative flex flex-col bg-sidebar border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          isMobile && mobileMenuOpen && "fixed left-0 top-0 h-full z-50",
          isMobile && !mobileMenuOpen && collapsed && "w-0 overflow-hidden md:w-16",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md",
            isMobile && collapsed && !mobileMenuOpen && "hidden",
          )}
          onClick={() => {
            if (isMobile) {
              setMobileMenuOpen(!mobileMenuOpen)
            } else {
              setCollapsed(!collapsed)
            }
          }}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>

        <nav className="flex-1 p-4 pt-8 bg-orange-600">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <li key={index}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                        collapsed && !mobileMenuOpen && "justify-center px-2",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                      )}
                      onClick={() => {
                        if (isMobile) {
                          setMobileMenuOpen(false)
                        }
                      }}
                    >
                      <item.icon className={cn("h-4 w-4", !(collapsed && !mobileMenuOpen) && "mr-3")} />
                      {!(collapsed && !mobileMenuOpen) && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
