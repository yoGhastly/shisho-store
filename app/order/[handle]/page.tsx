import { cookies } from "next/headers";
import React from "react";

export default async function Order({
  params,
}: {
  params: { handle: string };
}) {
  const piId = cookies().get("pi_id")?.value;
  return (
    <div className="h-screen">
      <p>Intent {piId ?? "No id found"}</p>
    </div>
  );
}
