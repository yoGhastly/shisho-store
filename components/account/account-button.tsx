"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "../skeleton";

export function UserAccount({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  const handleGoToSignIn = () => {
    if (!isLoggedIn) return router.push("/sign-in");
    router.push("/account");
  };

  return (
    <button aria-label="User Account" onClick={handleGoToSignIn}>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors">
        <Skeleton loaded={isLoggedIn}>
          <UserIcon className="h-4" />
        </Skeleton>
      </div>
    </button>
  );
}
