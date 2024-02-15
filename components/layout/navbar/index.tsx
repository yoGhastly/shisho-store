import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import OpenCart from "@/components/cart/open-cart";
import Cart from "@/components/cart";
import LogoSquare from "@/components/logo-square";
import styles from "../../../styles/Logo.module.css";
import { Product } from "@/app/types";

const { SITE_NAME, NEXT_PUBLIC_API_BASE_URL } = process.env;

const requestConfig = {
  url: `${NEXT_PUBLIC_API_BASE_URL}/products`,
  method: "GET",
};

export default async function Navbar() {
  const response = await fetch(requestConfig.url, {
    method: requestConfig.method,
    cache: "no-store",
  });

  const menu: Product[] = await response.json();

  if (!menu) return null;

  if (!response.ok) {
    throw new Error("Could not retrieve products from Navbar component");
  }

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div
              className={`${styles.magic} ml-2 flex-none text-sm font-bold uppercase md:hidden lg:block`}
            >
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/product/${item.id}`}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
