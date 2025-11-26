import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY faltando.");
}
if (!process.env.GESTOR_API_URL || !process.env.GESTOR_API_KEY) {
  throw new Error("Configuração do Gestor V1 faltando (.env).");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
} as any);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { message: "Session ID não fornecido." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { message: "Pagamento não confirmado." },
        { status: 400 }
      );
    }

    const itemsV1 = session.line_items?.data.map((item: any) => {
      const productData = item.price.product;
      const originalId = productData.metadata.productId;

      if (!originalId) {
        throw new Error(
          `Produto ${productData.name} sem ID original no metadata.`
        );
      }

      return {
        productId: parseInt(originalId),
        quantity: item.quantity,
      };
    });

    const v1Url = `${process.env.GESTOR_API_URL}/sales`;
    console.log(`Tentando registrar venda no V1: ${v1Url}`);

    const v1Response = await fetch(v1Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.GESTOR_API_KEY!,
      },
      body: JSON.stringify({
        saleDate: new Date().toISOString(),
        items: itemsV1,
      }),
    });

    const responseText = await v1Response.text();

    if (!v1Response.ok) {
      console.error("Erro vindo do V1 (Status):", v1Response.status);
      console.error("Erro vindo do V1 (Corpo):", responseText);

      let errorMessage = responseText;
      try {
        const jsonError = JSON.parse(responseText);
        errorMessage = jsonError.message || responseText;
      } catch (e) {
        // Não era JSON, mantém o texto puro
      }

      throw new Error(`V1 recusou a venda: ${errorMessage}`);
    }

    const successData = JSON.parse(responseText);
    return NextResponse.json({ success: true, saleId: successData.sale?.id });
  } catch (error) {
    console.error("Erro Crítico na Rota de Sucesso:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Erro interno desconhecido." },
      { status: 500 }
    );
  }
}
