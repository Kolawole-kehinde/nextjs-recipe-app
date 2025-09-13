"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { menu_list } from "@/constants/assets";
import { useProducts } from "@/hooks/useProducts";

const MAX_RECENT_SEARCHES = 5;
const RECENT_SEARCH_KEY = "recentSearches";

const SearchBar: React.FC = () => {
  const { data: products = [], isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCH_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  const updateRecentSearches = (term: string) => {
    if (!term.trim()) return;
    const updated = [
      term,
      ...recentSearches.filter((item) => item !== term),
    ].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectTerm = (term: string) => {
    setSearchTerm(term);
    updateRecentSearches(term);
    setShowDropdown(false);
  };

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setTimeout(() => setShowDropdown(false), 200);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p: any) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const filteredCategories = useMemo(() => {
    return menu_list.filter((c) =>
      c.menu_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-0 md:mt-4 px-0 sm:px-2 md:px-4">
      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSearchChange}
        placeholder="What would you love to buy today?"
        className="w-full hidden lg:block px-2 py-2 pl-2 lg:pl-10 rounded-md bg-white text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:px-3 md:px-4"
      />
      <Search
        size={18}
        className="hidden md:flex absolute top-1/2 right-7 transform -translate-y-1/2 text-gray-400"
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading products...</div>
          ) : (
            <>
              {/* Recently Searched */}
              {searchTerm === "" && recentSearches.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 px-4 py-2">
                    Recently Searched
                  </p>
                  {recentSearches.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectTerm(item)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {/* Products */}
              {searchTerm && (
                <>
                  <p className="text-xs font-semibold text-gray-500 px-4 py-2">
                    Products
                  </p>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectTerm(item.name)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No Result Found
                    </div>
                  )}

                  {/* Categories */}
                  <p className="text-xs font-semibold text-gray-500 px-4 py-2 mt-2">
                    Categories
                  </p>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectTerm(cat.menu_name)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {cat.menu_name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No Result Found
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
