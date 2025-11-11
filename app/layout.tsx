import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { CartIcon } from "./components/CartIcon";

export const metadata: Metadata = {
  title: "Gestor E-commerce",
  description: "Sua vitrine de produtos",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          <CartIcon />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
