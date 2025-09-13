import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface ProductTabsProps {
  description: string;
}

const ProductTabs = ({ description }: ProductTabsProps) => {
  const tabs: Tab[] = [
    { label: "Description", content: <p>{description}</p> },
    { label: "Delivery and Payment Terms", content: <p>Items are delivered within 3–5 business days. Payment is made on delivery or via card transfer.</p> },
    { label: "Packaging option", content: <p>Products are packaged in sealed, eco-friendly containers to preserve freshness.</p> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="mt-10">
      {/* Tab headers */}
      <div className="flex border-b border-gray-300 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`pb-2 text-sm font-medium transition-all duration-150 ${
              activeTab === tab.label
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 text-sm text-gray-700 border border-t-0 rounded-b">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
};

export default ProductTabs;
