"use client";

import { useState } from "react";
import FAQItem from "./components/FAQItem";
import { faqs } from "@/constants/faqData";

interface OpenIndex {
  category: string | null;
  index: number | null;
}

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<OpenIndex>({ category: null, index: null });

  const toggle = (category: string, index: number) => {
    setOpenIndex((prev) =>
      prev.category === category && prev.index === index
        ? { category: null, index: null }
        : { category, index }
    );
  };

  return (
    <div className="wrapper px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      {Object.entries(faqs).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">{category}</h2>
          <div className="bg-white rounded-md shadow border">
            {items.filter(Boolean).map((faq, index) => (
              <FAQItem
                key={index}
                category={category}
                index={index}
                faq={faq}
                openIndex={openIndex}
                toggle={toggle}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-10">
        <span className="text-sm text-gray-600">Need more help?</span>
        <button className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-orange-600">
          Start a live chat
        </button>
      </div>
    </div>
  );
};

export default FAQPage;
