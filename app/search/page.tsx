import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { getProducts } from "../lib/product";

export const runtime = "edge";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  // Check if searchValue exists, otherwise set it to an empty string
  const normalizedSearchValue = searchValue ?? "";

  const products = await getProducts();

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
