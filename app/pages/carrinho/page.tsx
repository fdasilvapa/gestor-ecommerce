// "use client";

// import { useCart } from "@/app/context/CartContext";
// import { formatCurrency } from "@/app/lib/utils";
// import { Trash2, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// export default function CartPage() {
//   const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleCheckout = async () => {
//     setIsSubmitting(true);

//     try {
//       const response = await fetch("/api/checkout/session", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(cartItems),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Falha ao criar sessão do checkout.");
//       }

//       const stripe = await stripePromise;
//       if (!stripe) {
//         throw new Error("Falha ao carregar o Stripe.");
//       }

//       const { error } = await stripe.redirectToCheckout({
//         sessionId: data.sessionId,
//       });

//       if (error) {
//         throw new Error(error.message);
//       }
//     } catch (error) {
//       console.error("Erro no checkout:", error);
//       alert(error instanceof Error ? error.message : "Erro desconhecido.");
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="container mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-8">Meu Carrinho</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center">
//           <p className="text-2xl text-gray-500 mb-6">
//             Seu carrinho está vazio.
//           </p>
//           <Link
//             href="/"
//             className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Continuar comprando
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Coluna dos Itens */}
//           <div className="md:col-span-2 space-y-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-sm"
//               >
//                 {/* Info do produto */}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{item.name}</h2>
//                   <p className="text-lg text-green-600 font-medium">
//                     {formatCurrency(item.price)}
//                   </p>
//                 </div>

//                 {/* Controles */}
//                 <div className="flex items-center space-x-4">
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       updateQuantity(item.id, parseInt(e.target.value))
//                     }
//                     className="w-16 p-2 border rounded-md text-center"
//                   />
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                     title="Remover"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Coluna do Resumo/Checkout */}
//           <div className="bg-white p-6 border rounded-lg shadow-sm h-fit">
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
//               Resumo
//             </h2>
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-xl font-medium text-gray-700">Total:</span>
//               <span className="text-3xl font-bold text-green-700">
//                 {formatCurrency(totalAmount)}
//               </span>
//             </div>
//             <button
//               onClick={handleCheckout}
//               disabled={isSubmitting}
//               className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold flex items-center justify-center disabled:opacity-50"
//             >
//               {isSubmitting ? (
//                 <Loader2 className="w-6 h-6 animate-spin" />
//               ) : (
//                 "Finalizar Compra"
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
