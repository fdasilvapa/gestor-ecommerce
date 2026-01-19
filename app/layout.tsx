import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GestorShop | Tecnologia",
  description: "O melhor e-commerce de tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />

          <div className="grow">{children}</div>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
