import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import Footer from "@/components/layout/footer";
import { GridTileImage } from "@/components/grid/tile";
import { getProducts } from "@/app/lib/product";

export const runtime = "edge";

/**
 * Returns a  product. The product is returned sorted by id,
 * Returns a list of products without the found product.
 *
 * @param id String
 */
const getProduct = async (id: string) => {
  const products = await getProducts();
  const foundProduct = products.find((p) => p.id === id);
  const relatedProducts = products.filter((product) => product.id !== id);

  return {
    foundProduct,
    relatedProducts,
  };
};

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const { foundProduct: product } = await getProduct(params.handle);

  if (!product) return notFound();

  return {
    title: product.name || product.id,
    description: product.description,
    openGraph: product.images
      ? {
        images: [
          {
            url: product.images[0],
            width: `300`,
            height: `300`,
            alt: `${product.name}`,
          },
        ],
      }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { foundProduct: product } = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "AggregateOffer",
      availability: product.active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: `AED`,
      highPrice: product.price || "",
      lowPrice: "10",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.images.map((image) => ({
                src: image,
                altText: `${product.name}`,
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const { relatedProducts } = await getProduct(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price,
                  currencyCode: `AED`,
                }}
                src={product.images[0]}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
