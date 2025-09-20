"use client";

import React, { useState, useEffect } from "react";
import AuthMenu from "./AuthMenu";
import userStore from "@/store/useStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user?.name || "Profile"} />
          ) : (
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </button>

      {isMenuOpen && <AuthMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default AuthButton;
