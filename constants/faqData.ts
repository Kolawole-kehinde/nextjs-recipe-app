export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: Record<string, FAQ[]> = {
  Orders: [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order using the tracking number sent to your email.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel within 24 hours of placing the order.",
    },
  ],
  Payments: [
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers.",
    },
  ],
  Shipping: [
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the country.",
    },
  ],
};
