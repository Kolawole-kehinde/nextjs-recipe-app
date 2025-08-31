"use client"
import { AppContext } from "@/context/AppContextProvider";
import Link from "next/link";
import { useContext } from "react";
import SkeletonCard from "../SkeletonCard";
import FoodItems from "../FoodItems";



const TopDishes = ({
  category = "All",
  title = "Top Dishes",
  subTitle = "See All",
  start = 0,
  end = 8,
  showMoreButton = true,
}) => {
  const { products } = useContext(AppContext);

  const isLoading = !products || products.length === 0;

  const filteredList =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <div className="wrapper px-4 lg:px-0 py-6">
       <div className="flex items-center justify-between">
       <h2 className="text-2xl font-bold mb-6 text-start">{title}</h2>
       <Link href="/all-dishes" className="text-primary">{subTitle}</Link>
       </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: end - start }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : filteredList.slice(start, end).map((item) => (
              <FoodItems key={item.id} {...item} />
            ))}
      </div>

      {showMoreButton && !isLoading && (
        <div className="text-center mt-6">
          <Link href="/all-dishes">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              More Dishes
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopDishes;
