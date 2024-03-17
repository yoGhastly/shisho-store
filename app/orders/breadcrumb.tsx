"use client";
import { BreadcrumbItem, Breadcrumbs, cn } from "@nextui-org/react";
import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import clsx from "clsx";

interface Props {
  values: string[];
}

export function BreadCrumb({ values }: Props) {
  const isSm = useMediaQuery(480);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Breadcrumbs
        size={isSm ? "sm" : "md"}
        itemClasses={{
          item: cn(
            "data-[current=true]:bg-[#E9EBEF] data-[current=true]:text-[#4D5768] data-[current=true]:font-semibold",
            "data-[current=true]:px-5 data-[current=true]:py-1.5 data-[current=true]:rounded-full data-[current=true]:text-xs",
          ),
        }}
      >
        {values.map((v, idx) => (
          <BreadcrumbItem key={`${v}-${idx}`}>
            <p
              className={clsx(
                {
                  "w-40": v.length > 15,
                },
                "whitespace-nowrap text-ellipsis overflow-hidden md:w-full",
              )}
            >
              {v}
            </p>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
