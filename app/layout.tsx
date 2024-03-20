import { ReactNode, Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Providers } from "./providers";

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
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
