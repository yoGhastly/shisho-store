"use client";

import { Chip } from "@nextui-org/react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Status = "In progress" | "Idle" | "No status";

interface Props {
  status: Status;
}

export function StatusChip({ status }: Props) {
  const isSm = useMediaQuery(480);
  const colorStatus =
    status === "In progress"
      ? "success"
      : status === "Idle"
        ? "warning"
        : "default";

  return (
    <Chip color={colorStatus} variant="flat" size={isSm ? "sm" : "md"}>
      {status}
    </Chip>
  );
}
