"use client";

import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export const CartIcon = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed top-8 right-8 z-10">
      <div className="relative p-3 bg-white rounded-full shadow-lg">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
};
