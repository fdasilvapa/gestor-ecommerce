export const formatCurrency = (amount: string | number) => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  return numericAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
