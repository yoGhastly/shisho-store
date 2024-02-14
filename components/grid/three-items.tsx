import Link from "next/link";
import { GridTileImage } from "./tile";
import { Product, ProductsResponse } from "@/app/types";

const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
    method: "GET",
    next: {
      tags: ["products"],
    },
  });

  const { products }: ProductsResponse = await res.json();

  return products;
};

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
      >
        <GridTileImage
          src={item.images[0]}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name as string,
            amount: item.price || "",
            currencyCode: "AED",
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const products = await getProducts();

  if (!products || products.length < 3) {
    return null;
  }

  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
