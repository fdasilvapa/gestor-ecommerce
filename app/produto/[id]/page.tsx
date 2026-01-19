import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";
import AddToCartButton from "@/app/components/AddToCartButton";
import { Product } from "@/app/types";
import { ProductList } from "@/app/components/ProductList";

// Função para buscar UM produto
async function getProduct(id: string): Promise<Product | null> {
  const url = `http://localhost:3000/api/public/products/${id}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.GESTOR_API_KEY || "",
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

// Função para buscar recomendados (todos menos o atual)
async function getRelatedProducts(currentId: number): Promise<Product[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/public/products`, {
      cache: "no-store",
      headers: {
        "x-api-key": process.env.GESTOR_API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    const allProducts: Product[] = await res.json();
    return allProducts.filter((p) => p.id !== currentId).slice(0, 3);
  } catch (e) {
    return [];
  }
}

// Definição do tipo das props (params é Promise no Next.js 15)
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  // 1. Aguardamos a resolução dos parâmetros
  const { id } = await params;

  // 2. Usamos o ID resolvido
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);
  const imageUrl = product.imagePath
    ? `http://localhost:3000${product.imagePath}`
    : null;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb simples */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Voltar para a loja
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Coluna da Esquerda: Imagem */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center relative overflow-hidden h-[500px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="text-gray-300 flex flex-col items-center">
              <span className="text-6xl">📷</span>
              <span className="mt-2">Sem Imagem</span>
            </div>
          )}
        </div>

        {/* Coluna da Direita: Informações */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {product.name}
          </h1>

          {/* Reviews Fake (Visual) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current text-gray-300" />
            </div>
            <span className="text-sm text-gray-500">(12 avaliações)</span>
          </div>

          <div className="text-3xl font-bold text-green-600 mb-6">
            {formatCurrency(product.price)}
            <span className="block text-sm text-gray-400 font-normal mt-1">
              Em até 12x sem juros
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description ||
              "Este produto é incrível, mas o vendedor esqueceu de colocar a descrição detalhada. Aproveite o preço!"}
          </p>

          {/* Botão de Adicionar ao Carrinho */}
          <div className="mt-8">
            <AddToCartButton product={product} imageUrl={imageUrl} />
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-8 h-8 text-green-600" />
              <span>Frete Grátis para todo o Brasil</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-8 h-8 text-green-600" />
              <span>Garantia de 12 meses inclusa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Reviews */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Avaliações dos Clientes
        </h2>
        <div className="space-y-6">
          <ReviewItem
            author="Carlos M."
            rating={5}
            text="Produto excelente! Chegou antes do prazo e a qualidade do som é absurda."
          />
          <ReviewItem
            author="Ana Julia"
            rating={4}
            text="Muito bom, mas achei que poderia vir com uma case de transporte."
          />
        </div>
      </div>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Você também pode gostar
          </h2>
          <ProductList products={relatedProducts} />
        </div>
      )}
    </main>
  );
}

// --- SUB-COMPONENTES ---

function ReviewItem({
  author,
  rating,
  text,
}: {
  author: string;
  rating: number;
  text: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-800">{author}</span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-current" : "text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
