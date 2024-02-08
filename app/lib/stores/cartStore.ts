import { create } from "zustand";

export interface Cart {
  id: string;
  items: LineItem[];
  updatedAt: Date;
}

interface LineItem {
  id: string;
  name: string;
  amount: string;
  description: string;
  images: string[];
  quantity: number;
}

interface CartStore {
  cart: Cart;
  setCartDetails: (details: Cart) => void;
}

const useCartStore = create<CartStore>((set, _get) => ({
  cart: {} as Cart,
  setCartDetails: (details: Cart) => set({ cart: details }),
}));

export default useCartStore;
