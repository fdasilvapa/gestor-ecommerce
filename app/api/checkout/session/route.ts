import { NextResponse } from "next/server";
import { CartItem } from "@/app/types";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("A variável de ambiente STRIPE_SECRET_KEY está faltando.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
  typescript: true,
});

export async function POST(request: Request) {
  try {
    const cartItems = (await request.json()) as CartItem[];
    const origin = request.headers.get("origin") || "http://localhost:3001";

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ message: "Carrinho vazio." }, { status: 400 });
    }

    const line_items = cartItems.map((item) => {
      const unitAmount = Math.round(Number(item.price) * 100);

      const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
        {
          name: item.name,
          metadata: {
            productId: String(item.id),
          },
        };

      if (item.image && item.image.startsWith("http")) {
        // productData.images = [item.image];
      }

      return {
        price_data: {
          currency: "brl",
          product_data: productData,
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/falha`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erro no Backend do Stripe:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
