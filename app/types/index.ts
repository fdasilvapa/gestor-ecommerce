export interface Product {
  id: number;
  name: string;
  price: string | number;
  description?: string;
  imagePath?: string | null;
  image?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: string | number;
  quantity: number;
  image?: string;
}

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
};
