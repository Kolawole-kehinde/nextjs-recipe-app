"use client";

import React from "react";
import { Leaf, Truck, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Leaf className="text-[#FF3D00] w-6 h-6" />,
    title: "Fresh Ingredients",
    description: "Only the freshest and natural ingredients in every meal.",
  },
  {
    icon: <Truck className="text-[#FF3D00] w-6 h-6" />,
    title: "Fast Delivery",
    description: "Your order delivered hot and on time, every time.",
  },
  {
    icon: <CreditCard className="text-[#FF3D00] w-6 h-6" />,
    title: "Easy Payment",
    description: "Multiple secure payment options at checkout.",
  },
];

const TopBanner = () => {
  return (
    <div className="wrapper bg-white py-12 px-4 lg:px-0 rounded-xl shadow-md border border-gray-100 mb-6">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-4"
          >
            <div className="bg-orange-50 p-3 rounded-full">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
