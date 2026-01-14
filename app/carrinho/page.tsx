"use client";

import { useCart } from "@/app/context/CartContext";
import { useCheckout } from "@/app/hooks/useCheckout";
import { formatCurrency } from "@/app/lib/utils";
import { Trash2, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const { handleCheckout, isSubmitting } = useCheckout();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-2xl text-gray-500 mb-6 font-medium">
            Seu carrinho está vazio.
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            Voltar para a loja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-24 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Detalhes do Produto */}
                <div className="flex-1 min-w-0">
                  {" "}
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>
                  <p className="text-green-600 font-bold mt-1">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                {/* Controles (Qtd e Deletar) */}
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remover item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo e Botão */}
          <div className="h-fit">
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                Resumo do Pedido
              </h2>

              <div className="flex justify-between items-center mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>

              <div className="flex justify-between items-center mb-6 pt-4 border-t border-dashed">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <button
                onClick={() => handleCheckout(cartItems)}
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition-all text-lg font-bold flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processando...
                  </>
                ) : (
                  "Finalizar Compra"
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                Compra segura processada pelo Stripe
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
