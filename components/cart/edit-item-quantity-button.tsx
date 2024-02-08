"use client";

// import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { updateItemQuantity } from "./actions";
import LoadingDots from "../loading-dots";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "cursor-not-allowed": pending,
          "ml-auto": type === "minus",
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black" />
      ) : type === "plus" ? (
        <p>+</p>
      ) : (
        <p>-</p>
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: any;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null);

  return (
    <form action={actionWithVariant as any}>
      <SubmitButton type={type} />
      {/* <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p> */}
    </form>
  );
}
