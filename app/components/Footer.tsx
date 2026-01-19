export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1 */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-800">GestorShop</h3>
            <p className="text-gray-500 text-sm">
              Sua loja de confiança para produtos eletrônicos e acessórios.
            </p>
          </div>

          {/* Coluna 2 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-green-600">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>(11) 99999-9999</li>
              <li>suporte@gestorshop.com</li>
              <li>Seg - Sex, 9h às 18h</li>
            </ul>
          </div>

          {/* Coluna 4 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Pagamento</h4>
            <div className="flex gap-2">
              {/* Simulando ícones de pagamento com div */}
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
              <div className="w-10 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GestorShop. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
