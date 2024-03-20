'use client';
import React from 'react';
import { Avatar } from '../avatar';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Details = {
  emailAddress: string;
  name: string;
};

interface Props {
  details: Details;
  showLogOutButton: boolean;
}

export function AccountDetails({ details, showLogOutButton }: Props) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="flex gap-5">
      <Avatar name={details.name ?? 'Guest'} />
      <div className="flex flex-col gap-1.5">
        <p className="uppercase font-bold text-xl">
          {details.name ?? 'Guest'}
        </p>
        <p>{details.emailAddress}</p>
        {showLogOutButton && (
          <button
            onClick={() => signOut(() => router.push('/'))}
            className="underline self-start hover:no-underline transition delay-75 hover:text-black/65"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
