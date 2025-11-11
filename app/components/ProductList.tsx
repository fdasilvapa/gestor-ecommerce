"use client";

import { Product } from "@/app/types";
import { formatCurrency } from "@/app/lib/utils";
import { useCart } from "@/app/context/CartContext";

type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow-lg overflow-hidden flex flex-col"
        >
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sem Imagem</span>
          </div>

          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4 flex-1">
              {product.description || "Este produto não possui descrição."}
            </p>
            <p className="text-3xl font-bold text-green-600 mb-4">
              {formatCurrency(product.price)}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-auto w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
