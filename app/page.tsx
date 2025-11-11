import { Product } from "./types";
import { ProductList } from "./components/ProductList";
import { formatCurrency } from "./lib/utils";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3001/api/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Falha ao buscar produtos da API interna (V2).");
      return [];
    }
    return await res.json();
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
        <ProductList products={products} />
      )}
    </main>
  );
}
