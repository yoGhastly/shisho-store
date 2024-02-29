import React from "react";

const getPaymentIntent = async (id: string) => {
  const response = await fetch(
    "https://shishobabyclothes.ae/api/v1/payment-intent",
    {
      method: "POST",
      body: JSON.stringify({ paymentIntentId: id }),
    },
  );

  const { intent } = await response.json();

  return intent;
};

export default async function Order({
  params,
}: {
  params: { handle: string };
}) {
  const intent = await getPaymentIntent(params.handle);
  console.log(intent);

  return (
    <div className="h-screen">
      <p>Intent</p>
    </div>
  );
}
