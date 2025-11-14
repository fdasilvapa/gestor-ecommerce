import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SucessoPage() {
  return (
    <main className="container mx-auto p-8 flex items-center text-center">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Pagamento aprovado!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Obrigado pela sua compra. Em breve, faremos a lógica para registrar este
        pedido no Gestor V1.
      </p>
      <Link
        href="/"
        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
      >
        Voltar para a loja
      </Link>
    </main>
  );
}
