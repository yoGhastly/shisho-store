import { create } from "zustand";
import Stripe from "stripe";

interface ProductStore {
  products: Stripe.Product[];
  setProducts: (products: Stripe.Product[]) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Stripe.Product[]) => set({ products }),
}));

export default useProductStore;
