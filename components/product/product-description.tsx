"use client";

import Stripe from "stripe";
import { AddToCart } from "../cart/add-to-cart";
import Price from "../price";
import Prose from "../prose";
import { VariantSelector } from "./variant-selector";
import { useEffect, useState } from "react";
import useAddToCartProductDetailsStore from "@/app/lib/stores/addToCartStore";
import { Product } from "@/app/types";

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

    return {
      id: ageRange,
      name: "Sizes",
      values: formattedValues,
      quantity: parseInt(quantity),
    };
  });
  return options;
}

export function ProductDescription({ product }: { product: Product }) {
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const { setProductDetails, addedToCartProductDetails } =
    useAddToCartProductDetailsStore();

  useEffect(() => {
    if (product.metadata && product.metadata.categoryWithQty) {
      const parsedOptions = parseMetadata(product.metadata.categoryWithQty);
      setOptions(parsedOptions);
    }
  }, [product]);

  useEffect(() => {
    if (product && selectedSize) {
      const { active, id, name, images, price } = product;
      setProductDetails({
        availableForSale: active,
        product: {
          id,
          name,
          size: selectedSize,
          amount: price,
          images,
          quantity: 1,
        },
      });
    }

    return () => {
      setProductDetails({
        availableForSale: false,
        product: {
          id: "",
          name: "",
          size: "",
          amount: "",
          images: [],
          quantity: 0,
        },
      });
    };
  }, [product, selectedSize, setProductDetails]);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-[#A0C4FF] p-2 text-sm text-white">
          <Price amount={product.price} currencyCode={`AED`} />
        </div>
      </div>
      <VariantSelector options={options} onSelectedSize={setSelectedSize} />

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.description}
        />
      ) : null}

      <AddToCart
        availableForSale={product.active}
        product={addedToCartProductDetails.product}
      />
    </>
  );
}
