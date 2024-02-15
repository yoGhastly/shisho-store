import { ProductsResponse } from "@/app/types";

export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "GET",
    cache: "no-store",
  });

  const { products }: ProductsResponse = await res.json();

  return products;
}
