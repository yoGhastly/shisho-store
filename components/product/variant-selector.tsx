'use client';

import { Dispatch, SetStateAction, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createUrl } from '@/app/lib/utils';
import clsx from 'clsx';

interface ProductOption {
  id: string;
  name: string;
  sizes: string[];
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
  const hasNoOptions = !options.length;

  if (hasNoOptions) {
    return <p className="text-gray-500 font-semibold">No sizes in stock</p>;
  }

  const handleSizeSelection = (optionUrl: string, size: string) => {
    router.replace(optionUrl, { scroll: false });
    onSelectedSize(size);
  };

  // Render the "sizes" label before mapping through options
  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">sizes</dt>
      <dd className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Suspense key={option.id}>
            <div>
              {option.sizes.map((value, _index) => {
                const optionNameLowerCase =
                  option.name.toLowerCase();
                const optionQuantity = option.quantity; // Access quantity for the current value

                // Base option params on current params so we can preserve any other param state in the url.
                const optionSearchParams = new URLSearchParams(
                  searchParams.toString(),
                );

                // Update the option params using the current option to reflect how the url *would* change,
                // if the option was clicked.
                optionSearchParams.set(
                  optionNameLowerCase,
                  value,
                );
                const optionUrl = createUrl(
                  pathname,
                  optionSearchParams,
                );

                const isAvailableForSale = option.quantity > 0;

                // The option is active if it's in the url params.
                const isActive =
                  searchParams.get(optionNameLowerCase) ===
                  value;

                return (
                  <div key={value}>
                    <button
                      aria-disabled={false}
                      disabled={false}
                      onClick={() => {
                        handleSizeSelection(
                          optionUrl,
                          value,
                        );
                      }}
                      title={`${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                      className={clsx(
                        'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm',
                        {
                          'cursor-default ring-2 ring-[#A0C4FF]':
                            isActive,
                          'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-[#A0C4FF]':
                            !isActive &&
                            isAvailableForSale,
                          'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                            !isAvailableForSale,
                        },
                      )}
                    >
                      {value}
                    </button>
                    <span
                      className={clsx(
                        'text-sm text-gray-400',
                        { hidden: !isActive },
                      )}
                    >
                      {optionQuantity > 0
                        ? `In stock: ${optionQuantity}`
                        : 'Out of stock'}
                    </span>
                  </div>
                );
              })}
            </div>
          </Suspense>
        ))}
      </dd>
    </dl>
  );
}
