export async function POST(req: Request) {
  try {
    const newCart = {
      id: "some-unique-cart-id",
      items: [
        {
          id: "productId",
          name: "product name",
          amount: "10",
          description: "product description",
          images: [
            "http://localhost:3000/_next/image?url=https%3A%2F%2Ffiles.stripe.com%2Flinks%2FMDB8YWNjdF8xT2ZaRHRLcnF2NlRBRDNDfGZsX3Rlc3RfYUs2OVk2NUIwQmNVWHBxT2trRDM3SzJZ00ooN8taHF&w=1920&q=75",
          ],
          quantity: 10,
        },
      ],
      createdAt: new Date(),
    };

    // Respond with the newly created cart object
    return Response.json({ cart: newCart });
  } catch (error) {
    console.error("Error creating new cart:", error);
    return Response.json({ error: "Error creating new cart" });
  }
}
