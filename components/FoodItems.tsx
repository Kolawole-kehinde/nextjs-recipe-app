"use client"

import React from "react"
import { Heart, Plus, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FoodItemProps } from "@/types/products"
import {useCartItems,useAddToCart,useRemoveFromCart,useWishlist,useToggleWishlist,useSetBuyNow,} from "@/hooks/useCart"
import { notify } from "@/helpers/notifications"

type Props = FoodItemProps & {
  onRemove?: () => void
  showRemoveButton?: boolean
}

const FoodItems = ({id,name,price,image_url,description,onRemove, showRemoveButton = false,
}: Props) => {
  const cartItems = useCartItems()
  const addToCart = useAddToCart()
  const removeFromCart = useRemoveFromCart()
  const wishlist = useWishlist()
  const toggleWishlist = useToggleWishlist()
  const setBuyNow = useSetBuyNow()

  const stringId = String(id)

  const quantityInCart =
    cartItems.find((item) => item.id === stringId)?.quantity || 0

  const isInWishlist = wishlist.some((item) => item.id === stringId)

  const product = {
    id: stringId,
    name,
    price,
    image_url: image_url ?? "",
    description: description ?? "",
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    isInWishlist ? notify.wishlist.removed(name) : notify.wishlist.added(name)
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
    notify.cart.added(name)
  }

  const handleBuyNow = () => {
    setBuyNow({ ...product, quantity: 1 })
    notify.buyNow(name)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition relative">
      {/* Remove icon (only for wishlist page) */}
      {showRemoveButton && onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 z-20 p-1 rounded-full bg-white shadow hover:bg-red-100 text-gray-600 hover:text-red-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="relative">
        <Link href={`/product-details/${stringId}`}>
          <Image
            src={image_url ?? "/images/placeholder.png"}
            alt={name}
            className="w-full h-48 object-cover rounded-t-xl"
            width={500}
            height={300}
            unoptimized
          />
        </Link>

        {/* Action icons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-2">
          <Heart
            onClick={handleToggleWishlist}
            className={`text-xl cursor-pointer ${
              isInWishlist ? "fill-red-600 stroke-red-600" : "text-white"
            } hover:stroke-red-600 transition`}
          />

          {quantityInCart === 0 ? (
            <Plus
              onClick={handleAddToCart}
              className="text-primary text-xl cursor-pointer bg-white rounded-full p-1 hover:scale-110 transition"
            />
          ) : (
            <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md">
              <img
                onClick={() => {
                  removeFromCart(stringId)
                  notify.cart.removed(name)
                }}
                src="/images/remove_icon_red.png"
                alt="Remove item"
                className="w-7 cursor-pointer"
              />
              <p className="text-sm font-medium">{quantityInCart}</p>
              <img
                onClick={handleAddToCart}
                src="/images/add_icon_green.png"
                alt="Add item"
                className="w-7 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Image
            src="/images/rating_starts.png"
            alt="Rating stars"
            className="w-16 h-auto"
            width={64}
            height={16}
          />
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-primary font-bold">${price}</p>
      </div>
    </div>
  )
}

export default FoodItems
