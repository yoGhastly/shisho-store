import { create } from "zustand";

interface AddToCartProductDetailsStore {
  addedToCartProductDetails: ProductDetails;
  setProductDetails: (details: ProductDetails) => void;
}

interface ProductDetails {
  availableForSale: boolean;
  product: {
    id: string;
    name: string;
    size: string;
    amount: string;
    images: string[];
    quantity: number;
  };
}

const useAddToCartProductDetailsStore = create<AddToCartProductDetailsStore>(
  (set) => ({
    addedToCartProductDetails: {
      availableForSale: false,
      product: {
        id: "",
        name: "",
        size: "",
        amount: "",
        images: [],
        quantity: 0,
      },
    },
    setProductDetails: (details: ProductDetails) =>
      set({ addedToCartProductDetails: details }),
  }),
);

export default useAddToCartProductDetailsStore;
