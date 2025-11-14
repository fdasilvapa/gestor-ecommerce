import Link from "next/link";
import { XCircle } from "lucide-react";

export default function FalhaPage() {
  return (
    <main className="container mx-auto p-8 flex flex-col items-center text-center">
      <XCircle className="w-24 h-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Pagamento Cancelado</h1>
      <p className="text-lg text-gray-600 mb-8">
        Seu pagamento foi cancelado ou falhou. Seu carrinho ainda está salvo.
      </p>
      <Link
        href="/carrinho"
        className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Tentar novamente
      </Link>
    </main>
  );
}
