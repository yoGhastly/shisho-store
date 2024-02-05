import { create } from "zustand";
import Stripe from "stripe";

interface ProductStore {
  products: Stripe.Product[];
  setProducts: (products: Stripe.Product[]) => void;
  getProductById: (id: string) => Stripe.Product | undefined;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products: Stripe.Product[]) => set({ products }),
  getProductById: (id: string) => {
    const { products } = get();
    const foundProduct = products.find((p) => p.id === id);
    return foundProduct;
  }
}));

export default useProductStore;
