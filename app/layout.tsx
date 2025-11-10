// Importa o tipo 'Metadata' do Next.js
import type { Metadata } from "next";
// Importa o 'React' para usar o tipo 'ReactNode'
import React from "react";
import "./globals.css";

// Adicionamos o tipo 'Metadata' à constante
export const metadata: Metadata = {
  title: "Gestor E-commerce",
  description: "Sua vitrine de produtos",
};

// 1. Definimos um tipo para as props do nosso layout
type RootLayoutProps = {
  children: React.ReactNode; // 2. 'children' é do tipo React.ReactNode
};

// 3. Aplicamos o tipo às props da função
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
