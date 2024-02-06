"use client";

import { createUrl } from "@/app/lib/utils";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export function VariantSelector({ options }: { options: ProductOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  return options.map((option) => (
    <Suspense key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current params so we can preserve any other param state in the url.
            const optionSearchParams = new URLSearchParams(
              searchParams.toString(),
            );

            // Update the option params using the current option to reflect how the url *would* change,
            // if the option was clicked.
            optionSearchParams.set(optionNameLowerCase, value);
            const optionUrl = createUrl(pathname, optionSearchParams);

            // In order to determine if an option is available for sale, we need to:
            //
            // 1. Filter out all other param state
            // 2. Filter out invalid options
            // 3. Check if the option combination is available for sale
            //
            // This is the "magic" that will cross check possible variant combinations and preemptively
            // disable combinations that are not available. For example, if the color gray is only available in size medium,
            // then all other sizes should be disabled.
            const filtered = Array.from(optionSearchParams.entries()).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            // The option is active if it's in the url params.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                key={value}
                aria-disabled={false}
                disabled={false}
                onClick={() => {
                  router.replace(optionUrl, { scroll: false });
                }}
                title={`${option.name} ${value}${false ? " (Out of Stock)" : ""
                  }`}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
                  {
                    "cursor-default ring-2 ring-[#FFC6FF]": isActive,
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-[#FFC6FF] ":
                      !isActive && false,
                    "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
                      false,
                  },
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </Suspense>
  ));
}
