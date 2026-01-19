"use client";

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface AddToCartButtonProps {
  product: Product;
  imageUrl?: string | null;
}

export default function AddToCartButton({
  product,
  imageUrl,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      image: imageUrl || undefined,
      price: product.price.toString(),
    });

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`
        w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 
        transition-all duration-300 shadow-md hover:shadow-lg
        ${
          isAdded
            ? "bg-green-700 text-white cursor-default scale-[0.98]"
            : "bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02] active:scale-95"
        }
      `}
    >
      {isAdded ? (
        <>
          <Check className="w-6 h-6" />
          <span>Adicionado!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-6 h-6" />
          <span>Adicionar ao Carrinho</span>
        </>
      )}
    </button>
  );
}
