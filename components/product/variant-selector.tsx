"use client";

import { Dispatch, SetStateAction, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/app/lib/utils";
import clsx from "clsx";

interface ProductOption {
  id: string;
  name: string;
  values: string[];
  quantity: number;
}

export function VariantSelector({
  options,
  onSelectedSize,
}: {
  options: ProductOption[];
  onSelectedSize: Dispatch<SetStateAction<string | undefined>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const handleSizeSelection = (optionUrl: string, size: string) => {
    router.replace(optionUrl, { scroll: false });
    onSelectedSize(size);
  };

  return options.map((option) => (
    <Suspense key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value, _index) => {
            const optionNameLowerCase = option.name.toLowerCase();
            const optionQuantity = option.quantity; // Access quantity for the current value

            // Base option params on current params so we can preserve any other param state in the url.
            const optionSearchParams = new URLSearchParams(
              searchParams.toString(),
            );

            // Update the option params using the current option to reflect how the url *would* change,
            // if the option was clicked.
            optionSearchParams.set(optionNameLowerCase, value);
            const optionUrl = createUrl(pathname, optionSearchParams);

            const isAvailableForSale = option.quantity > 0;

            // The option is active if it's in the url params.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <div key={value}>
                <button
                  aria-disabled={false}
                  disabled={false}
                  onClick={() => {
                    handleSizeSelection(optionUrl, value);
                  }}
                  title={`${option.name} ${value}${
                    !isAvailableForSale ? " (Out of Stock)" : ""
                  }`}
                  className={clsx(
                    "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
                    {
                      "cursor-default ring-2 ring-[#A0C4FF]": isActive,
                      "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-[#A0C4FF]":
                        !isActive && isAvailableForSale,
                      "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
                        !isAvailableForSale,
                    },
                  )}
                >
                  {value}
                </button>
                <span className="text-sm text-gray-400">
                  {optionQuantity > 0
                    ? `In stock: ${optionQuantity}`
                    : "Out of stock"}
                </span>
              </div>
            );
          })}
        </dd>
      </dl>
    </Suspense>
  ));
}
