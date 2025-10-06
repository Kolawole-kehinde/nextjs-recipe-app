"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardHeader from "@/features/dashboard/dashbord-header";
import { Sidebar } from "@/features/dashboard/SideBar";

export default function DashboardLayout({ children,}: {children: React.ReactNode;}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Mobile menu button */}
        {/* <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
          
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>


        </div> */}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
