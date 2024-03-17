"use client";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Avatar as NextUIAvatar } from "@nextui-org/react";

export function Avatar({ name }: { name: string }) {
  const isSm = useMediaQuery(480);
  return (
    <NextUIAvatar
      name={name}
      tw="text-white"
      size={isSm ? "md" : "lg"}
      color="secondary"
      getInitials={(name) => {
        const words = name.split(" ");
        const initials = words.map((word) => word.charAt(0)).join("");
        return initials.toUpperCase();
      }}
    />
  );
}
