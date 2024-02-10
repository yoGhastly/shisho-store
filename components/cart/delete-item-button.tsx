"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { removeItem } from "./actions";
import LoadingDots from "../loading-dots";
import { CartItem } from "@/types/cart";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-200 transition-all duration-200",
        {
          "cursor-not-allowed px-0": pending,
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="h-4" />
      )}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = () => formAction(itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
