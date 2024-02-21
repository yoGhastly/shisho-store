import { ThreeItemGrid } from "@/components/grid/three-items";
import { Carousel } from "@/components/carousel";
import { Suspense } from "react";
import Footer from "@/components/layout/footer";
import PaymentStatusModal from "@/components/payment/modal-payment-listener";

export const runtime = "edge";

export const metadata = {
  title: "Home | Shisho Baby Clothes",
  description: "High-performance ecommerce store built by Xervsware",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      <PaymentStatusModal />
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
