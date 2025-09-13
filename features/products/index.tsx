"use client";

import FoodItems from "@/components/FoodItems";
import { useProducts } from "@/hooks/useProducts";

const AllDishes = () => {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <main className="max-w-7xl mx-auto">
      {/* 🔹 Banner */}
      {/* <Banner title="All Dishes" subtitle="Explore all our delicious dishes" /> */}

      <section className="px-4 md:px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Explore all our delicious dishes
        </h2>

        {isLoading && <p className="text-center">Loading products...</p>}
        {isError && (
          <p className="text-center text-red-500">Failed to load products.</p>
        )}

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <FoodItems key={item.id} {...item} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-gray-500">No products found.</p>
          )
        )}
      </section>
    </main>
  );
};

export default AllDishes;
