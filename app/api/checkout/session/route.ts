import { NextResponse } from "next/server";
import { CartItem } from "@/app/types";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: Request) {
  try {
    const cartItems = (await request.json()) as CartItem[];

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: "O carrinho está vazio." },
        { status: 400 }
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartItems.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: item.quantity,
      }));

    const success_url = `http:localhost:3001/sucesso?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `http:localhost:3001/falha`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: success_url,
      cancel_url: cancel_url,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Erro ao criar sessão do Stripe:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
