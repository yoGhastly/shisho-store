import useRequest from "./useRequest";
import { ProductsResponse } from "../types";
import { revalidateTag } from "next/cache";
import { TAGS } from "../lib/constants";

const useProducts = () => {
  const { data: productsData, error: productsError } =
    useRequest<ProductsResponse>({
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      method: "GET",
    });

  revalidateTag(TAGS.products);

  if (productsError) {
    console.error("Error fetching products", productsError);
    throw new Error("Could not get products");
  }

  return {
    products: productsData && productsData.products,
  };
};

export default useProducts;
