"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  HelpCircle,
  MessageSquareText,
  ShoppingBag,
  Bell,
  ShoppingCart,
} from "lucide-react";
import { useCartContext } from "@/context/CartContext";

interface NavMenuProps {
  orderId?: string;
  isMobile?: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ orderId, isMobile }) => {
  const { cartItems } = useCartContext();
  const pathname = usePathname();

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const baseClass =
    "flex items-center space-x-1 px-2 py-1 cursor-pointer hover:text-[#FF3D00]";
  const activeClass =
    "w-[150px] md:w-auto text-primary border-b-2 border-primary rounded-b-md bg-[#e6f0fa]";
  const getMenuClass = (path: string) =>
    `${baseClass} ${pathname === path ? activeClass : ""}`;

  const menuItems = [
    { to: "/help", label: "Help", icon: <HelpCircle size={20} /> },
    { to: "/messages", label: "Messages", icon: <MessageSquareText size={20} /> },
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
      to: `/order/${orderId ?? ""}`,
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
