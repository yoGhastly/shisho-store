"use client";
import React from "react";
import { Avatar } from "../avatar";
import { Link } from "@nextui-org/react";

export function AccountDetails() {
  return (
    <div className="flex gap-5">
      <Avatar name="Diego Espinosa" />
      <div className="flex flex-col gap-1.5">
        <p className="uppercase font-bold text-xl">Diego Espinosa</p>
        <p>diego.espinosagrc@uanl.edu.mx</p>
        <Link href="/" underline="always" color="foreground">
          Log out
        </Link>
      </div>
    </div>
  );
}
