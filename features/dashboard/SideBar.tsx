"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/constants/sidebar";

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className="bg-[#fff4f0] rounded-2xl">
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 text-black transform transition-all duration-300 ease-in-out lg:transform-none
        ${isCollapsed ? "lg:w-16" : "lg:w-64"} w-64
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Collapse button */}
        <div className="hidden lg:block absolute -right-3 top-8">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 bg-[#fff4f0] text-black rounded-full shadow-lg flex items-center justify-center hover:bg-[#e5ebf1] transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <nav className={`${isCollapsed ? "lg:px-2" : "px-4"} space-y-1`}>
          {navigation?.map((item) => {
            const isActive =
              item.href &&
              (pathname === item.href ||
                (item.href === "/orders" && pathname.startsWith("/orders")));

            // 🔑 Add spacing before Account
            const wrapperClasses =
              item.name === "Account" ? "mt-40" : "";

            if (item.children) {
              return (
                <div key={item.name} className={wrapperClasses}>
                  {/* Parent label */}
                  <div
                    className={`flex items-center gap-3 rounded-lg text-sm font-medium text-black/80 
                      ${isCollapsed ? "lg:px-2 lg:py-3 lg:justify-center" : "px-4 py-3"}`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`${isCollapsed ? "lg:hidden" : ""}`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Children */}
                  <div className={`ml-6 space-y-1 ${isCollapsed ? "lg:hidden" : ""}`}>
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-colors
                            ${childActive
                              ? "bg-orange-600/35 text-black"
                              : "text-black/70 hover:text-black hover:bg-black/10"}`}
                        >
                          <child.icon className="w-4 h-4" />
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href!}
                onClick={() => setIsMobileMenuOpen(false)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 rounded-lg text-sm font-medium relative group transition-colors
                  ${isCollapsed ? "lg:px-2 lg:py-3 lg:justify-center" : "px-4 py-3"}
                  ${isActive
                    ? "bg-orange-600/35 text-black"
                    : "text-black/80 hover:text-black hover:bg-black/10"}
                  ${wrapperClasses}`} 
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`${isCollapsed ? "lg:hidden" : ""}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
