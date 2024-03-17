import React from "react";

export function AddressBook() {
  return (
    <section className="bg-secondary/[0.25] rounded-sm p-3 flex flex-col gap-3">
      <p className="uppercase font-bold">Address Book</p>
      <div className="text-[#4D5768]">
        <p>Jose Diego Espinosa Garcia</p>
        <p>Address Line 1</p>
        <p>Address Line 2</p>
      </div>
    </section>
  );
}
