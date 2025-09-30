"use client";

import React, { useState, useEffect } from "react";
import AuthMenu from "./AuthMenu";
import userStore from "@/store/useStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Get initials like "KK"
const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (
    (parts[0][0] || "").toUpperCase() + (parts[1][0] || "").toUpperCase()
  );
};

const AuthButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = userStore((state) => state.user);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [user]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center">
        <Avatar className="w-9 h-9 cursor-pointer border border-gray-200">
          {!user ? (
            // No user → default image
            <AvatarImage src="/images/Ellipse 2.png" alt="Guest" />
          ) : user.avatar ? (
            // User with uploaded avatar
            <AvatarImage src={user.avatar} alt={user.name || "Profile"} />
          ) : (
            // User without avatar → initials
            <AvatarFallback>
              {user.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </button>

      {isMenuOpen && <AuthMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default AuthButton;
