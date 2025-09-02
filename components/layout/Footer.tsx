"use client"

import React from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/dist/client/link';
import SuggestionInput from '../SuggestionInput';

const Footer = ({orderId}) => {
   const {loading, handleLogout } = useAuth();
    // Logic for logging out the user
  
  return (
    <footer className="bg-black text-white text-sm lg:px-16 mt-10">
      {/* Top Section */}
      <div className="wrapper px-4 flex flex-col lg:flex-row items-start justify-between py-8 gap-8">
        {/* Left Section */}
        <div className="w-full max-w-[507px]">
          <h2 className="text-2xl font-bold mb-3">
            FD<span className="text-primary">A</span>
          </h2>
          <p className="mb-4 text-lg leading-[30px] text-gray-300 font-normal font-poppins w-full max-w-[450px]">
            FoodieApp (FDP) Online Ordering Platform is your premier destination for wholesale foods.
            We’re committed to your wholesale trading success and also giving you the best online shopping experience. Cheers!
          </p>
        </div>

        {/* Company */}
        {/* <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-6">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/partnership" className="hover:underline">Partnership</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
          </ul>
        </div> */}

        {/* Help & Support */}
        <div>
          <h3 className="font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-6">
            <li><Link href="/help" className="hover:underline">FAQs</Link></li>
            <li><Link href="/support" className="hover:underline">Talk to Support</Link></li>
            <li><Link href="/live-chat" className="hover:underline">Live Chat</Link></li>
            <li><Link href="/settings" className="hover:underline">Settings</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-4">Account</h3>
          <ul className="space-y-6">
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            <li><Link href={`/order/${orderId}`} className="hover:underline">Orders</Link></li>
            <li><Link href="/cart" className="hover:underline">Cart</Link></li>
           <button
            onClick={() => {
              handleLogout();
            }}
           >
            {loading ? 'Logging out...' : 'Logout'}
           </button>
          </ul>
        </div>
      </div>

      {/* Suggestion Bar */}
      <div className="border-t border-white/20 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Social Links */}
          <div className="flex flex-col items-start gap-3 w-full md:w-auto">
            <h2 className="font-semibold">Follow us on social media</h2>
            <div className="flex items-center gap-4">
              <Link href="#" className="flex items-center gap-2 hover:text-blue-400">
                <FaFacebookSquare /> Facebook
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-pink-400">
                <FaInstagram /> Instagram
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-blue-300">
                <FaLinkedin /> LinkedIn
              </Link>
            </div>
          </div>

          {/* Suggestion Input */}
          <SuggestionInput />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 border-t border-white/10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <p className="text-gray-400 text-center md text-sm :text-left">
            © 2024 Fresh Market Exchange (FDA) Inc. Copyright and rights reserved
          </p>
          <div className="flex justify-center gap-4 text-gray-400">
            <Link href="/terms" className="hover:underline">Terms and Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
