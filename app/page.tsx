import { Product } from "./types";
import { formatCurrency } from "./lib/utils";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3001/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Falha ao buscar produtos da API interna.");
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no fetch:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Nossos Produtos</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          Nenhum produto encontrado. (Verifique se o V1 está rodando).
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              {/* Imagem Placeholder */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Sem imagem</span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 flex-1">
                  {product.description || "Este produto não possui descrição."}
                </p>
                <p className="text-3xl font-bold text-green-600 mb-4">
                  {formatCurrency(product.price)}
                </p>
                <button className="mt-auto w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
