import React from "react";

export default async function Order({
  params,
}: {
  params: { handle: string };
}) {
  return (
    <div className="h-screen">
      <p>Order {params.handle}</p>
    </div>
  );
}
