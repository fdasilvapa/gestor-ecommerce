import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Decorativo (Gradiente) */}
      <div className="absolute inset-0 bg-linear-to-r from-green-900/90 to-slate-900/90 z-10" />

      {/* Imagem de Fundo (Opcional, usando uma cor sólida por enquanto) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

      <div className="container mx-auto px-4 py-24 relative z-20">
        <div className="max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-300 text-sm font-bold mb-6 border border-green-500/30">
            NOVAS OFERTAS DISPONÍVEIS
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tecnologia que <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">
              transforma seu dia
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Encontre os melhores gadgets, periféricos e acessórios para o seu
            setup. Qualidade garantida e entrega rápida para todo o Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-green-900/50 flex items-center justify-center gap-2">
              Ver Produtos
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10">
              Sobre Nós
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
