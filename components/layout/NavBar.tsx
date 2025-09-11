"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Logo from "./logo";
import SearchBar from "../CustomSearch";
import NavMenu from "./NavMenu";
import { useCartContext } from "@/context/CartContext";
import { Menu, ShoppingCart, X } from "lucide-react";



const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCartContext();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <header className="bg-[#e5ebf1] py-6 mb-8 md:mb-16 px-4 lg:px-0">
      <nav className="wrapper w-full">
        {/* Mobile layout */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Logo */}
          <Logo />

          {/* Right side: Cart, User, Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-primary"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User/Auth Button */}
            <AuthButton toggleMenu={toggleMenu} />

            {/* Hamburger Menu */}
            <button onClick={toggleMenu} className="text-2xl">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Large screen layout */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <Logo />
          <div className="flex-1 px-4">
            <SearchBar />   
          </div>
          <div className="flex items-center space-x-2 text-gray-700 text-sm">
            <NavMenu />
          </div>
          <div className="relative flex items-center">
            <AuthButton toggleMenu={toggleMenu} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <nav className="lg:hidden">
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "w-full h-[350px] opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
          onClick={toggleMenu}
        >
          <div className="flex flex-col space-y-4 text-gray-700 text-lg bg-[#e5ebf1] p-4 rounded-md shadow-md">
            <NavMenu isMobile />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
