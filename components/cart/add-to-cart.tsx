'use client';

import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';
import LoadingDots from '../loading-dots';
import { addItem } from './actions';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CartItem } from '@/types/cart';

function SubmitButton({ availableForSale }: { availableForSale: boolean }) {
    const { pending } = useFormStatus();
    const buttonClasses =
        'relative flex w-full items-center justify-center rounded-full bg-[#A0C0eF] drop-shadow-sm p-4 tracking-wide text-white';
    const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

    if (!availableForSale) {
        return (
            <button
                aria-disabled
                className={clsx(buttonClasses, disabledClasses)}
            >
                Out Of Stock
            </button>
        );
    }

    return (
        <button
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                if (pending) e.preventDefault();
            }}
            aria-label="Add to cart"
            aria-disabled={pending}
            className={clsx(buttonClasses, {
                'hover:opacity-90': true,
                disabledClasses: pending,
            })}
        >
            <div className="absolute left-0 ml-4">
                {pending ? (
                    <LoadingDots className="mb-3 bg-white" />
                ) : (
                    <PlusIcon className="h-4" />
                )}
            </div>
            Add To Cart
        </button>
    );
}

export function AddToCart({
    availableForSale,
    product: productDetails,
}: {
    availableForSale: boolean;
    product: CartItem;
}) {
    const [message, formAction] = useFormState(addItem, null);

    const actionWithProduct = () => {
        const formData = new FormData();
        formData.append('id', productDetails.id);
        formData.append('name', productDetails.name);
        formData.append('size', productDetails.size);
        formData.append('amount', productDetails.amount);
        formData.append('images', JSON.stringify(productDetails.images));
        formData.append('quantity', productDetails.quantity.toString());
        formAction(formData);
    };

    return (
        <form action={actionWithProduct}>
            <p className="text-danger/80 my-3">{message}</p>
            <SubmitButton availableForSale={availableForSale} />
            <p aria-live="polite" className="sr-only" role="status">
                {message}
            </p>
        </form>
    );
}
