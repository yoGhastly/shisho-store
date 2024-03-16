"use client";
import { BreadcrumbItem, Breadcrumbs, cn } from "@nextui-org/react";
import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Props {
  currentValue: string | undefined;
}

export function BreadCrumb({ currentValue }: Props) {
  const isSm = useMediaQuery(480);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Breadcrumbs
        size={isSm ? "sm" : "md"}
        itemClasses={{
          item: cn(
            "data-[current=true]:bg-[#E9EBEF] data-[current=true]:text-[#4D5768] data-[current=true]:font-semibold",
            "data-[current=true]:px-5 data-[current=true]:py-1.5 data-[current=true]:rounded-full",
          ),
        }}
      >
        <BreadcrumbItem href="/orders">Orders</BreadcrumbItem>
        <BreadcrumbItem isCurrent>{currentValue}</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}
