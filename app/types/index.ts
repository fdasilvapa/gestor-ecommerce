export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
};
