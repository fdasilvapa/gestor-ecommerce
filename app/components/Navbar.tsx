"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-600 text-white p-2 rounded-lg group-hover:bg-green-700 transition-colors">
            <span className="font-bold text-xl tracking-tighter">G</span>
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Gestor<span className="text-green-600">Shop</span>
          </span>
        </Link>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Início
          </Link>
          <Link href="#" className="hover:text-green-600 transition-colors">
            Categorias
          </Link>
          <Link href="#" className="hover:text-green-600 transition-colors">
            Ofertas
          </Link>
          <Link href="#" className="hover:text-green-600 transition-colors">
            Contato
          </Link>
        </div>

        {/* Ações (Carrinho) */}
        <div className="flex items-center gap-4">
          {/* Botão de Busca (Visual apenas por enquanto) */}
          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
            <Search className="w-6 h-6" />
          </button>

          {/* Ícone do Carrinho */}
          <Link
            href="/carrinho"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Menu Mobile (Visual) */}
          <button className="md:hidden p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
