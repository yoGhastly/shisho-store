import { ProductsResponse } from "@/app/types";
import { unstable_noStore } from "next/cache";

export async function getProducts() {
  "use server";
  unstable_noStore();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "GET",
  });

  const { products }: ProductsResponse = await res.json();

  return products;
}
