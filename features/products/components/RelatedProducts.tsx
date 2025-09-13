"use client";

import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import FoodItems from "@/components/FoodItems";
import RelatedProductsSkeleton from "./skeletons/RelatedProductsSkeleton";

interface RelatedProductsProps {
  category?: string;
  title?: string;
  excludeId?: string | null;
  limit?: number;
}

const RelatedProducts = ({
  category = "All",
  title = "You May Also Like",
  excludeId = null,
  limit = 4,
}: RelatedProductsProps) => {
  const { data: products = [], isLoading, isError } = useProducts();

  const relatedProducts = useMemo(() => {
    return products
      .filter(
        (item) =>
          (category === "All" || item.category === category) &&
          item.id !== excludeId
      )
      .slice(0, limit);
  }, [products, category, excludeId, limit]);

  if (isLoading) return <RelatedProductsSkeleton count={limit} />;

  if (isError || relatedProducts.length === 0) {
    return (
      <section className="wrapper px-4 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-gray-500 text-center">No related products found.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {relatedProducts.map((item) => (
          <FoodItems key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
