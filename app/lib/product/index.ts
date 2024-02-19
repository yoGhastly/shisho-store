import { ProductsResponse } from "@/app/types";
import { stripe } from "../stripe/server";

export async function getProducts() {
  "use server";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "GET",
  });

  const { products }: ProductsResponse = await res.json();

  const { data: prices } = await stripe.prices.list({ limit: 50 });

  const productsWithPrices = products.map((product) => {
    const matchedPrice = prices.find((price) => price.product === product.id);

    const price = matchedPrice?.unit_amount;

    if (!price) return { ...product, price: "10.00" };

    // Convert price to dollars and format with two decimal places
    const formattedPrice = (price / 100).toFixed(2);

    // Return the product with the price included
    return { ...product, price: formattedPrice };
  });

  return productsWithPrices;
}
