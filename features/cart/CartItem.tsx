"use client";

import { CartItem as CartItemType } from "@/types/cart";

type Props = CartItemType & {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image_url,
  description,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <section className="border-b">
      <div className="flex flex-col md:flex-row gap-4 py-4 px-6 border-b shadow-lg">
        <img
          src={image_url}
          alt={name}
          className="w-full md:w-40 h-48 object-cover rounded"
        />

        <div className="flex-1 shadow-md px-4 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="text-right">
              <p className="font-bold text-lg">${price}</p>
              <p className="text-xs text-gray-500">
                ${price} × {quantity} items
              </p>
            </div>
          </div>

          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}

          <div className="flex justify-between items-center mt-4">
            <button onClick={onRemove} className="text-primary mr-6">
              Remove
            </button>

            <div className="flex items-center rounded w-48 h-auto">
              <button
                onClick={onDecrease}
                className="border border-primary rounded px-4 py-2"
              >
                -
              </button>
              <div className="border-b border-t py-2 flex-1 justify-center flex items-center">
                <span className="mx-2">{quantity}</span>
              </div>
              <button
                onClick={onIncrease}
                className="border border-primary rounded px-4 py-2"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
