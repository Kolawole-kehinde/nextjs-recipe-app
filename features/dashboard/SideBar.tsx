"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { navigation } from "@/constants/sidebar";
import { useLogout } from "@/hooks/auth/useAuth";
import { AlertDialog } from "@/components/shared/AlertDialog";

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function Sidebar({
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { mutate: logout } = useLogout();

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 text-black transform transition-all duration-300 ease-in-out
        ${isCollapsed ? "lg:w-16" : "lg:w-64"} w-64
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        bg-[#fff4f0] rounded-r-2xl`}
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

        {/* Sidebar Header */}
        <div
          className={`flex items-center justify-between px-4 py-4 border-b border-black/10 ${
            isCollapsed ? "lg:justify-center" : ""
          }`}
        >
          {!isCollapsed && (
            <h1 className="text-lg font-bold text-black">User Panel</h1>
          )}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-black/10"
            onClick={() => setIsMobileMenuOpen?.(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`${isCollapsed ? "lg:px-2" : "px-4"} space-y-1 mt-4`}>
          {navigation.map((item) => {
            const isActive =
              item.href &&
              (pathname === item.href ||
                (item.href === "/orders" && pathname.startsWith("/orders")));

            const wrapperClasses = item.name === "Account" ? "mt-40" : "";

            if (item.children) {
              return (
                <div key={item.name} className={wrapperClasses}>
                  {/* Parent Label */}
                  <div
                    className={`flex items-center gap-3 rounded-lg text-sm font-medium text-black/80 
                      ${
                        isCollapsed
                          ? "lg:px-2 lg:py-3 lg:justify-center"
                          : "px-4 py-3"
                      }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`${isCollapsed ? "lg:hidden" : ""}`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Children Links */}
                  <div
                    className={`ml-6 space-y-1 ${isCollapsed ? "lg:hidden" : ""}`}
                  >
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;

                      if (child.name === "Logout") {
                        return (
                          <button
                            key={child.name}
                            onClick={() => {
                              setIsMobileMenuOpen?.(false);
                              setLogoutDialogOpen(true);
                            }}
                            className={`flex items-center gap-2 rounded-lg text-sm px-3 py-2 w-full text-left transition-colors
                              ${
                                childActive
                                  ? "bg-orange-600/35 text-black"
                                  : "text-black/70 hover:text-black hover:bg-black/10"
                              }`}
                          >
                            <child.icon className="w-4 h-4" />
                            {child.name}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen?.(false)}
                          className={`flex items-center gap-2 rounded-lg text-sm px-3 py-2 transition-colors
                            ${
                              childActive
                                ? "bg-orange-600/35 text-black"
                                : "text-black/70 hover:text-black hover:bg-black/10"
                            }`}
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
                onClick={() => setIsMobileMenuOpen?.(false)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 rounded-lg text-sm font-medium relative group transition-colors
                  ${
                    isCollapsed
                      ? "lg:px-2 lg:py-3 lg:justify-center"
                      : "px-4 py-3"
                  }
                  ${
                    isActive
                      ? "bg-orange-600/35 text-black"
                      : "text-black/80 hover:text-black hover:bg-black/10"
                  }
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
      </aside>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Logout Confirmation"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => logout()}
      />
    </>
  );
}
