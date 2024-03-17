import { Button } from "@nextui-org/react";
import React from "react";

export function ReturnItem() {
  return (
    <section className="bg-secondary/[0.25] rounded-sm p-3 flex flex-col gap-3">
      <p className="uppercase font-bold">Returns</p>
      <Button className="uppercase" variant="solid" color="secondary">
        Return an Item
      </Button>
    </section>
  );
}
