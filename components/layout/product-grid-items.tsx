import Link from "next/link";
import Grid from "../grid";
import { GridTileImage } from "../grid/tile";
import Stripe from "stripe";

export default function ProductGridItems({
  products,
}: {
  products: Stripe.Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.id}`}
          >
            <GridTileImage
              alt={product.name}
              label={{
                title: product.name,
                amount: "10", //product.default_price,
                currencyCode: `AED`,
              }}
              src={product.images[0]}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
