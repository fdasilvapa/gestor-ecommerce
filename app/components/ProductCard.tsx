import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: string | number;
  imagePath?: string | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const API_BASE_URL = "http://localhost:3000";

  const imageUrl = product.imagePath
    ? `${API_BASE_URL}${product.imagePath}`
    : "https://placehold.co/400x400/e2e8f0/94a3b8?text=Sem+Imagem";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Área da Imagem */}
      <div className="relative h-48 w-full bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mb-4 grow">
          {/* Se tiver descrição no futuro, ela entra aqui */}
          Produto incrível
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </span>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price.toString(),
                image: imageUrl,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
