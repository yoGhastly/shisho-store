import { create } from "zustand";
import Stripe from "stripe";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: string) => Stripe.Product | undefined;
}

interface Product extends Stripe.Product {
  price: string;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  getProductById: (id: string) => {
    const { products } = get();
    const foundProduct = products.find((p) => p.id === id);
    return foundProduct;
  },
}));

export default useProductStore;
