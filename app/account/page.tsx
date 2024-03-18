import Footer from "@/components/layout/footer";
import { UserProfile } from "@clerk/nextjs";
import React, { Suspense } from "react";
import { BreadCrumb } from "../orders/breadcrumb";

export default function Page() {
  return (
    <React.Fragment>
      <section className="flex flex-col justify-center items-center p-5 gap-10">
        <header className="w-full max-w-4xl">
          <BreadCrumb
            values={[
              { label: "Orders", url: "/orders" },
              { label: "Your Account", url: "/account" },
            ]}
          />
        </header>
        <Suspense fallback={<p>Loading...</p>}>
          <UserProfile />
        </Suspense>
      </section>
      <Footer />
    </React.Fragment>
  );
}
