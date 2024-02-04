import useRequest from "./useRequest";
import { ProductsResponse } from "../types";
import useProductStore from "../lib/stores/product.store";

const requestConfig = {
  url: "http://localhost:3000/api/v1/products",
  method: "GET",
};

const useProducts = () => {
  const { data, error } = useRequest<ProductsResponse>(requestConfig);
  const setProducts = useProductStore((state) => state.setProducts);

  if (error) {
    console.error("Error fetching products", error);
    throw new Error("Could not get products");
  }

  setProducts(data?.products || []);

  return {
    products: data?.products,
  };
};

export default useProducts;
