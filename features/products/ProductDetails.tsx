"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, Star, Check } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import ProductTabs from "../components/ProductTabs";
import { useAddToCart, useSetBuyNow } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProducts";
import ProductDetailsSkeleton from "./components/skeletons/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const addToCart = useAddToCart();
  const setBuyNow = useSetBuyNow(); 

  const handleQuantityChange = (val: number) => {
    setQuantity((prev) => Math.max(1, prev + val));
  };

  const handleBuyNow = () => {
    if (!product) return;
    setBuyNow({ ...product, quantity });
    router.push("/checkout");
  };

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Error: {error?.message || "Something went wrong"}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">Product not found</div>
    );
  }

  return (
    <section>
      <div className="wrapper px-4 lg:px-0 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-16">
          <div
            className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            <h2 className="text-base">Back</h2>
          </div>
          <button className="border border-gray-300 text-sm px-4 py-1 rounded-md flex items-center gap-2 hover:bg-gray-100">
            <MessageCircle className="w-4 h-4" />
            Chat Seller
          </button>
        </div>

        {/* Product Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20">
          {/* Image */}
          <div>
            <img
              src={product.image_url || "/images/placeholder.png"}
              alt={product.name}
              className="w-full max-w-[500px] h-auto rounded-2xl shadow-md object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-6 flex-1 w-full max-w-xl">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-[#FF3D00] mb-4">
                ${product.price}
              </p>

              <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  (120 reviews)
                </span>
              </div>

              <p className="text-base text-gray-700 mt-4">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  In Stock
                </span>
                <span>Prep time: 15 mins</span>
              </div>

              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" /> Freshly prepared with
                  natural ingredients
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" /> No artificial
                  preservatives
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" /> Eco-friendly packaging
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-4 mb-2 text-gray-600 text-sm">
                <span>Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => addToCart({ ...product, quantity })}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow-md"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + Related */}
        <ProductTabs description={product.description} />
        <RelatedProducts category={product.category} excludeId={product.id} />
      </div>
    </section>
  );
};

export default ProductDetails;
