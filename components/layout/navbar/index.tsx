import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
import { getProducts } from '@/app/lib/product';
import LogoSquare from '@/components/logo-square';
import OpenCart from '@/components/cart/open-cart';
import Cart from '@/components/cart';
import '../../../styles/Logo.module.css';
import { currentUser } from '@clerk/nextjs';
import { checkAdminStatus } from '@/app/sign-in/actions';
import { SunnySpellsBasic } from '@/config/fonts';

const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getProducts();
  const user = await currentUser();
  const { isAdmin } = await checkAdminStatus({
    email: user?.emailAddresses[0].emailAddress ?? '',
  });

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu
          menu={menu}
          isLoggedIn={user ? true : false}
          isAdmin={isAdmin}
        />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div
              className={`${SunnySpellsBasic.className} magic ml-2 flex-none text-2xl font-bold uppercase md:hidden lg:block`}
              style={{
                background:
                  'linear-gradient(270deg, #ffc6ff 1.27%, #a0c4ff 26.44%, #9bf6ff 51.62%, #a0c4ff 77.78%, #ffc6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              <li>
                <Link
                  href={`/search`}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  href={user ? '/account' : '/sign-in'}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {user ? 'My Account' : 'Sign In'}
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex gap-2.5 justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
