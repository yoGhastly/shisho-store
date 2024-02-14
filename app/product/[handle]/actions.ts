export async function getProductPrice({ productId }: { productId: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/prices`,
    {
      method: "POST",
      body: JSON.stringify({ productId }),
    },
  );
  const { price } = await res.json();

  return price;
}
