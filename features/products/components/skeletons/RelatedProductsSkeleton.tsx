"use client";

export default function RelatedProductsSkeleton({ count = 4 }) {
  return (
    <section className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-white p-4 rounded-lg shadow"
          >
            <div className="bg-gray-200 h-40 w-full rounded-md mb-4"></div>
            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
