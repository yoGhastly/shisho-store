import { SignUp } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-center gap-8 p-5">
      <section
        className={clsx(
          "w-full h-full flex justify-center items-center bg-secondary/[0.2]",
        )}
      >
        <div className="flex flex-col max-w-lg gap-3">
          <h1 className="font-semibold text-center text-3xl">
            Sign Up to view your orders.
          </h1>
          <p className="text-center text-[#4D5768]">
            Sign up to access your order history, track your shipments, and
            manage your account details. Once signed in, you can view all your
            past orders and easily reorder your favorite items.
          </p>
          <figure className="w-52 h-52 relative self-center">
            <Image
              src="/logo_2.svg"
              fill
              alt="Shisho Baby Clothes Logo"
              className="object-contain"
            />
          </figure>
        </div>
      </section>
      <div className="w-full h-full flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}
