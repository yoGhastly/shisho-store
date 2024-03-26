'use client';

import Footer from '@/components/layout/footer';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-dvh flex-col gap-5">
      <div className="flex flex-col gap-3 justify-center items-center">
        <figure>
          <Image
            src="/logo_2.svg"
            width={100}
            height={100}
            alt="Shisho Baby Clothes Logo"
          />
        </figure>
        <h2 className="font-bold text-4xl">
          We&apos;ve lost this order
        </h2>
        <p>
          Oops! Looks like your order went on a vacation without
          telling us! 🏖️
        </p>
      </div>
      <Button
        color="primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <span className="text-white">Try again</span>
      </Button>
    </div>
  );
}
