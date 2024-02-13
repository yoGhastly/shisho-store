import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import Stripe from "stripe";

export const runtime = "edge";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

const requestConfig = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
  method: "GET",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  // Check if searchValue exists, otherwise set it to an empty string
  const normalizedSearchValue = searchValue ?? "";

  const response = await fetch(requestConfig.url, {
    method: requestConfig.method,
  });

  const { products }: { products: Stripe.Product[] } = await response.json();

  // Filter products only if searchValue is not an empty string
  const filteredProducts = normalizedSearchValue
    ? products.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            ?.includes(normalizedSearchValue.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            ?.includes(normalizedSearchValue.toLowerCase())
        );
      })
    : products;

  const resultsText = filteredProducts.length > 1 ? "results" : "result";

  return (
    <>
      {normalizedSearchValue ? (
        <p className="mb-4">
          {filteredProducts.length === 0
            ? "There are no products that match "
            : `Showing ${filteredProducts.length} ${resultsText} for `}
          <span className="font-bold">&quot;{normalizedSearchValue}&quot;</span>
        </p>
      ) : null}
      {filteredProducts.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={filteredProducts} />
        </Grid>
      ) : null}
    </>
  );
}
