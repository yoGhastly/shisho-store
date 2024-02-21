import Link from "next/link";
import { Suspense } from "react";
import FooterMenu from "./footer-menu";
import LogoSquare from "../logo-square";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");
  const skeleton = "w-full h-6 animate-pulse rounded bg-neutral-200";
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="bg-[#F4F4F4] text-sm text-neutral-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span
              className={`uppercase`}
              style={{
                background:
                  "linear-gradient(270deg, #ffc6ff 1.27%, #a0c4ff 26.44%, #9bf6ff 51.62%, #a0c4ff 77.78%, #ffc6ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {SITE_NAME}
            </span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu
            menu={[
              { title: "Home", path: "/" },
              { title: "About us", path: "/about-us" },
              { title: "Shipping Policy", path: "/shipping-policy" },
              {
                title: "Cancellation and Refund Policy",
                path: "/cancellation-and-refund-policy",
              },
              { title: "Privacy Policy", path: "/privacy-policy" },
            ]}
          />
        </Suspense>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <p className="md:ml-auto">
            <a
              href="https://xervsware.com"
              target="_blank"
              className="text-black"
            >
              Designed and Developed by Xervsware
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
