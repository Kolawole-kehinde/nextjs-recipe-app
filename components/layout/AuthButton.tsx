"use client";

import React, { useState, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";
import AuthMenu from "./AuthMenu";
import userStore from "@/store/useStore";


const AuthButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = userStore((state) => state.user);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative text-black">
      <button
        onClick={toggleMenu}
        className="flex items-center cursor-pointer hover:text-[#FF3D00]"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <User size={20} />
        )}
        <ChevronDown size={20} />
      </button>

      {isMenuOpen && <AuthMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default AuthButton;
