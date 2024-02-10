import { Cart } from "@/types/cart";
import { create } from "zustand";

interface CartStore {
  cart: Cart;
  setCartDetails: (details: Cart) => void;
}

const useCartStore = create<CartStore>((set, _get) => ({
  cart: {} as Cart,
  setCartDetails: (details: Cart) => set({ cart: details }),
}));

export default useCartStore;
