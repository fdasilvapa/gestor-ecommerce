import { NextResponse } from "next/server";

const GESTOR_API_URL = process.env.GESTOR_API_URL;
const GESTOR_API_KEY = process.env.GESTOR_API_KEY;

export async function GET() {
  if (!GESTOR_API_URL || !GESTOR_API_KEY) {
    console.error(
      "Variáveis de ambiente GESTOR_API_URL ou GESTOR_API_KEY não definidas"
    );
    return NextResponse.json(
      { message: "Erro de configuração no servidor." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${GESTOR_API_URL}/products`, {
      method: "GET",
      headers: {
        "x-api-key": GESTOR_API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Erro ao buscar produtos da API V1:", errorData.message);
      return NextResponse.json(
        { message: errorData.message || "Falha ao buscar produtos." },
        { status: response.status }
      );
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro interno na API Route V2:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
