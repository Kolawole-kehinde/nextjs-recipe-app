"use client";

import React from "react";
import { Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-[#FFF4F0] px-4 lg:px-0 shadow-md w-full">
      <div className="wrapper rounded-xl md:py-5 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div className="max-w-xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Delicious Meals Delivered to You
          </h2>

          <p className="text-gray-600 text-sm md:text-base mb-4">
            Order your favorite dishes and enjoy fast, fresh delivery. Healthy,
            tasty, and just a click away!
          </p>

          <Link href="/all-dishes">
            <button className="flex items-center gap-2 bg-[#FF3D00] hover:bg-orange-700 text-white px-5 py-3 rounded-full text-sm font-semibold transition duration-200">
              <Utensils className="w-5 h-5" />
              Order Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div>
          <Image
            src="/images/food_22.png"
            alt="Delicious food"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
