import React from "react";
import Footer from "@/components/layout/footer";
import { AccountDetails } from "@/components/account/acount-details";
import { AddressBook } from "@/components/account/address-book";
import { ReturnItem } from "@/components/account/return-item";
import { OrderItem } from "@/components/account/order-item";
import { BreadCrumb } from "./breadcrumb";
import { cookies } from "next/headers";

export default function Orders() {
  console.log(cookies().get("att_e"));

  return (
    <React.Fragment>
      <section className="flex flex-col h-screen md:gap-8 justify-center items-center">
        <header className="flex self-start w-full px-10 max-w-6xl mx-auto mt-10">
          <div>
            <BreadCrumb values={[{ label: "Your Account", url: "/orders" }]} />
          </div>
        </header>

        <article className="flex flex-col md:flex-row gap-5 w-full h-full p-5 max-w-6xl mx-auto">
          <aside className="h-full rounded-sm basis-1/3 p-5 flex flex-col gap-10">
            <AccountDetails />
            <AddressBook />
            <ReturnItem />
          </aside>
          <section className="rounded-sm h-full basis-full p-5 flex flex-col gap-5">
            <h2 className="uppercase font-bold text-2xl">Your Orders</h2>
            <OrderItem />
          </section>
        </article>
      </section>
      <Footer />
    </React.Fragment>
  );
}
