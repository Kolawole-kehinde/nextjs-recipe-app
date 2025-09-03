"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  HelpCircle,
  LogOut,
  LogIn,
  UserPlus,
  UtensilsCrossed,
  Home,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthMenuProps {
  closeMenu: () => void;
  orderId?: string;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ closeMenu, orderId }) => {
  const { user, loading, handleLogout } = useAuth();

  return (
    <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-50">
      {user ? (
        <>
          <div className="px-4 py-2 text-gray-700 font-semibold">
            Hello, {user.name || "User"}!
          </div>

          <Link
            href="/profile"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <User size={18} /> Profile
          </Link>

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <Home size={18} /> Dashboard
          </Link>

          <Link
            href={`/order/${orderId}`}
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <UtensilsCrossed size={18} /> Orders
          </Link>

          <Link
            href="/help"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <HelpCircle size={18} /> Help Center
          </Link>

          <Link
            href="/settings"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <Settings size={18} /> Settings
          </Link>

          <button
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:text-primary"
          >
            <LogOut size={18} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <LogIn size={18} /> Login
          </Link>

          <Link
            href="/auth/register"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary"
          >
            <UserPlus size={18} /> Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthMenu;
