import Stripe from "stripe";
import { AddToCart } from "../cart/add-to-cart";
import Price from "../price";
import Prose from "../prose";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Stripe.Product }) {
  console.log({ isAvailable: product.active });
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-[#FFC6FF] p-2 text-sm text-white">
          <Price amount={"10"} currencyCode={`AED`} />
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.description}
        />
      ) : null}

      <AddToCart availableForSale={product.active} />
    </>
  );
}
