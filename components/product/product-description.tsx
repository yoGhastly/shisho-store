import Stripe from "stripe";
import { AddToCart } from "../cart/add-to-cart";
import Price from "../price";
import Prose from "../prose";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Stripe.Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.default_price as string}
            currencyCode={`AED`}
          />
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <AddToCart availableForSale={product.active} />
    </>
  );
}
