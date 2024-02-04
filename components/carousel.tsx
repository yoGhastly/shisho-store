"use client";

import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import useProducts from "@/app/hooks/useProducts";

export function Carousel() {
  const { products } = useProducts();

  if (!products?.length) return null;

  const carouselProducts = [...products.slice(3, products.lenght)];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: "10", // TODO: product.default_price
                  currencyCode: `AED`,
                }}
                src={product.images[0]}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
