"use client";

import React, { useState } from "react";
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
import { useLogout } from "@/hooks/auth/useAuth";
import useUserStore from "@/store/useStore";
import { AlertDialog } from "@/components/AlertDialog";

interface AuthMenuProps {
  closeMenu: () => void;
  orderId?: string;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ closeMenu, orderId }) => {
  const user = useUserStore((state) => state.user);
  const { mutateAsync: logout, isPending } = useLogout(); // using mutateAsync so it works well in async confirm
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-50">
      {user ? (
        <>
          <div className="px-4 py-2 text-gray-700 font-semibold">
            Hello, {user?.name || "User"}!
          </div>

          {/* Links */}
          <Link
            href="/profile"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <User size={18} /> Profile
          </Link>

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <Home size={18} /> Dashboard
          </Link>

          <Link
            href={orderId ? `/order/${orderId}` : "/orders"}
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <UtensilsCrossed size={18} /> Orders
          </Link>

          <Link
            href="/help"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <HelpCircle size={18} /> Help Center
          </Link>

          <Link
            href="/settings"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <Settings size={18} /> Settings
          </Link>

          {/* Logout button opens dialog */}
          <button
            onClick={() => setLogoutDialogOpen(true)}
            disabled={isPending}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <LogOut size={18} />
            {isPending ? "Logging out..." : "Logout"}
          </button>

          {/* Logout confirmation dialog */}
          <AlertDialog
            open={logoutDialogOpen}
            onOpenChange={setLogoutDialogOpen}
            title="Logout Confirmation"
            description="Are you sure you want to logout?"
            confirmText="Logout"
            cancelText="Cancel"
            onConfirm={logout}
            onCancel={() => setLogoutDialogOpen(false)}
          />
        </>
      ) : (
        <>
          {/* Login / Register Links */}
          <Link
            href="/auth/login"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <LogIn size={18} /> Login
          </Link>

          <Link
            href="/auth/register"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
          >
            <UserPlus size={18} /> Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthMenu;
