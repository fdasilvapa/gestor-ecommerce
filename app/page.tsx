import { Product } from "./types";
import { ProductList } from "./components/ProductList";
import Hero from "./components/Hero";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3001/api/products", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Erro no fetch:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* Banner Principal */}
      <Hero />

      {/* Seção de Produtos */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Produtos em Destaque
          </h2>
          <span className="text-sm text-gray-500">
            {products.length} produtos encontrados
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-xl">
              Nenhum produto encontrado no momento.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Verifique se o Backend V1 está rodando.
            </p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </main>
  );
}
