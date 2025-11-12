"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const CartIcon = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/carrinho" className="fixed top-8 right-8 z-10 cursor-pointer">
      <div className="relative p-3 bg-white rounded-full shadow-lg">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};
