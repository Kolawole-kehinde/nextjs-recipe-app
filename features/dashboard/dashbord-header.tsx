"use client";

import { Input } from "@/components/ui/input";
import useUserStore from "@/store/useStore";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";


const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard",
  subtitle,
  searchPlaceholder = "Search...",
  searchQuery = "",
  onSearchChange,
}) => {
  const user = useUserStore((state) => state.user);
  const debouncedSearch = useDebounce(searchQuery, 600);

  // ✅ Log only after debounce delay
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      console.log("🔍 Debounced search:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <header className="bg-white border-b px-4 lg:px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm lg:text-base text-gray-600">
            {subtitle || (
              <>
                Welcome back <span className="font-bold">{user?.name}!</span>{" "}
                Here’s what’s happening with your orders.
              </>
            )}
          </p>
        </div>

        {onSearchChange && (
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-10 w-48 sm:w-64 lg:w-80"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

