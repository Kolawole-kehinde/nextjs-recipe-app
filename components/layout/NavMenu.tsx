"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  HelpCircle,
  ShoppingBag,
  Bell,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { useCartCount, useFavoritesCount } from "@/hooks/useCart";

interface NavMenuProps {
  orderId?: string;
  isMobile?: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ orderId, isMobile }) => {
  const cartCount = useCartCount();
  const favoritesCount = useFavoritesCount();
  const pathname = usePathname();

  const baseClass =
    "flex items-center space-x-1 px-2 py-1 cursor-pointer hover:text-[#FF3D00]";
  const activeClass =
    "w-[150px] md:w-auto text-primary border-b-2 border-primary rounded-b-md bg-[#e6f0fa]";
  const getMenuClass = (path: string) =>
    `${baseClass} ${pathname === path ? activeClass : ""}`;

  const menuItems = [
    { to: "/faq", label: "Help", icon: <HelpCircle size={20} /> },
    // { to: "/messages", label: "Messages", icon: <MessageSquareText size={20} /> },
    {
      to: "/cart",
      label: "Cart",
      icon: (
        <div className="relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      to: "/wishlist",
      label: "Wishlist",
      icon: (
        <div className="relative">
          <Heart size={20} />
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {favoritesCount}
            </span>
          )}
        </div>
      ),
    },
  {
  to: orderId ? `/order/${orderId}` : "/orders",
    label: "Orders",
    icon: <ShoppingBag size={20} />,
  },
  { to: "/notification", label: "Notification", icon: <Bell size={20} /> },
  ];

  return (
    <>
      {/* Home icon only on mobile */}
      {isMobile && (
        <div className="md:hidden">
          <Link href="/" className={getMenuClass("/")}>
            <Home size={20} />
            <span>Home</span>
          </Link>
        </div>
      )}

      {menuItems.map(({ to, label, icon }) => (
        <Link href={to} className={getMenuClass(to)} key={to}>
          {icon}
          <span>{label}</span>
        </Link>
      ))}
    </>
  );
};

export default NavMenu;
