"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function SucessoPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const processedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || processedRef.current) return;

    const registerSale = async () => {
      processedRef.current = true;

      try {
        const res = await fetch(
          `/api/checkout/success?session_id=${sessionId}`
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Erro ao registrar venda.");

        setStatus("success");
        clearCart();
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    };

    registerSale();
  }, [sessionId, clearCart]);

  return (
    <main className="container mx-auto p-8 flex flex-col items-center text-center min-h-[60vh] justify-center">
      {status === "loading" && (
        <>
          <Loader2 className="w-24 h-24 text-blue-500 animate-spin mb-6" />
          <h1 className="text-3xl font-bold text-gray-700">
            Processando seu pedido...
          </h1>
          <p className="text-gray-500 mt-2">
            Estamos confirmando o pagamento e emitindo seu pedido.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Pagamento Aprovado!
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Obrigado pela sua compra. Seu pedido foi registrado com sucesso em
            nosso sistema.
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar para a loja
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <AlertTriangle className="w-24 h-24 text-yellow-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Pagamento confirmado, mas...
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Houve um erro ao registrar seu pedido no sistema interno.
            <br />
            <span className="text-sm font-mono bg-gray-100 p-1 rounded mt-2 block text-red-500">
              {message}
            </span>
          </p>
          <p className="text-gray-500 mb-6">
            Não se preocupe, seu pagamento está seguro. Entre em contato
            conosco.
          </p>
          <Link
            href="/"
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Voltar para o início
          </Link>
        </>
      )}
    </main>
  );
}
