"use client";

import Stripe from "stripe";
import { AddToCart } from "../cart/add-to-cart";
import Price from "../price";
import Prose from "../prose";
import { VariantSelector } from "./variant-selector";
import { useEffect, useState } from "react";

interface ProductOption {
  id: string;
  name: string;
  values: string[];
  quantity: number;
}

function parseMetadata(metadata: string): ProductOption[] {
  const options = metadata.split(", ").map((item) => {
    const [category, quantity] = item.split("_");
    const [ageRange, ageQty] = category.split("-"); // Split age range and quantity
    const values = category.split("_");
    const formattedValues = values.map(
      (valueQty) => valueQty.split("-")[0] + `-` + `${ageQty}`,
    );
    console.log({ formattedValues });
    return {
      id: ageRange,
      name: "Sizes",
      values: formattedValues,
      quantity: parseInt(quantity),
    };
  });
  return options;
}

export function ProductDescription({ product }: { product: Stripe.Product }) {
  const [options, setOptions] = useState<ProductOption[]>([]);

  useEffect(() => {
    if (product.metadata && product.metadata.categoryWithQty) {
      const parsedOptions = parseMetadata(product.metadata.categoryWithQty);
      setOptions(parsedOptions);
    }
  }, [product]);

  console.log("Options:", options);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-[#FFC6FF] p-2 text-sm text-white">
          <Price amount={"10"} currencyCode={`AED`} />
        </div>
      </div>
      <VariantSelector options={options} />

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
