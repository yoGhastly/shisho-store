export interface CartItem {
  id: string;
  name: string;
  size: string;
  amount: string;
  images: string[];
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  updatedAt: Date;
}
