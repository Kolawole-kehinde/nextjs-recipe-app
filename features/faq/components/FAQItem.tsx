"use client";

import { FAQ } from "@/constants/faqData";
import { Minus, Plus } from "lucide-react";


interface FAQItemProps {
  category: string;
  index: number;
  faq: FAQ;
  openIndex: { category: string | null; index: number | null };
  toggle: (category: string, index: number) => void;
}

const FAQItem = ({ category, index, faq, openIndex, toggle }: FAQItemProps) => {
  if (!faq) return null;

  const isOpen = openIndex?.category === category && openIndex?.index === index;

  return (
    <div className="border-b px-4">
      <button
        onClick={() => toggle(category, index)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-base font-medium text-gray-800">{faq.question}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      {isOpen && faq.answer && (
        <div className="text-sm text-gray-600 pb-4">{faq.answer}</div>
      )}
    </div>
  );
};

export default FAQItem;
