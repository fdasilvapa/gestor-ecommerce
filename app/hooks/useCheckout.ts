import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/app/types";

export const useCheckout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (cartItems: CartItem[]) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao iniciar checkout.");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não encontrada.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Ocorreu um erro ao processar o pagamento.");
      setIsSubmitting(false);
    }
  };

  return { handleCheckout, isSubmitting };
};
