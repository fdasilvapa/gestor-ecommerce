import Image from "next/image";
import { ShoppingCart, ImageIcon, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const API_BASE_URL = "http://localhost:3000";

  const imageUrl = product.imagePath
    ? `${API_BASE_URL}${product.imagePath}`
    : null;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* ÁREA DA IMAGEM */}
      <div className="relative h-56 w-full bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-xs uppercase font-bold tracking-wider">
              Sem Foto
            </span>
          </div>
        )}

        {/* Badge Opcional (Ex: "Novo") */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
          NOVO
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-5 flex flex-col grow">
        <div className="mb-4">
          <h3
            className="text-lg font-bold text-gray-800 mb-1 leading-tight line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 h-10">
            {product.description || "Sem descrição disponível."}
          </p>
        </div>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Preço</span>
            <span className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(product.price))}
            </span>
          </div>

          <button
            onClick={() =>
              addToCart({
                ...product,
                image: imageUrl || undefined,
                price: product.price.toString(),
              })
            }
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white p-3 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center group/btn"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={20} className="mr-0 lg:mr-2" />
            <span className="hidden lg:inline font-medium">Comprar</span>
            <Plus
              size={14}
              className="ml-1 hidden lg:block opacity-0 group-hover/btn:opacity-100 transition-opacity translate-x-1 group-hover/btn:translate-x-0"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
