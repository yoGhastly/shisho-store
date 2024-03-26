import { ReactNode, Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL('https://shishobabyclothes.ae'),
  title: {
    default: 'Shisho Baby Clothes',
    template: `%s | Shisho Baby Clothes`,
  },
  description:
    'Adorable Fashion for Little Ones! At Shisho Baby clothes, we believe in making every moment with your little one extra special',
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="font-sans light">
      <body className="bg-neutral-50 text-black selection:bg-teal-300">
        <Providers>
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
