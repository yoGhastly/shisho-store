import { create } from "zustand";

interface AddToCartProductDetailsStore {
  addedToCartProductDetails: ProductDetails;
  setProductDetails: (details: ProductDetails) => void;
}

interface ProductDetails {
  availableForSale: boolean;
  product: { id: string; name: string; size: string; amount: string };
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
      },
    } as ProductDetails,
    setProductDetails: (details: ProductDetails) =>
      set({ addedToCartProductDetails: details }),
  }),
);

export default useAddToCartProductDetailsStore;
