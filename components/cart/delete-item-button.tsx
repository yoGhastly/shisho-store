"use client";

// import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { removeItem } from "./actions";
import LoadingDots from "../loading-dots";

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
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
        {
          "cursor-not-allowed px-0": pending,
        },
      )}
    >
      {pending ? <LoadingDots className="bg-white" /> : <p>x</p>}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: any }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null);

  return (
    <form action={actionWithVariant as any}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
