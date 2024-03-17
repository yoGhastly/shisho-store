"use client";

import { ReactNode } from "react";
import { Skeleton as NextUISkeleton } from "@nextui-org/react";

export function Skeleton({
  loaded,
  children,
}: {
  loaded: boolean;
  children: ReactNode;
}) {
  return <NextUISkeleton isLoaded={loaded}>{children}</NextUISkeleton>;
}
