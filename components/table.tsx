"use client";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import {
  Table as NextUITable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface Props {
  labelList: string[];
  bodyRows: string[];
}

export function Table({ labelList, bodyRows }: Props) {
  const isSm = useMediaQuery(480);
  return (
    <NextUITable removeWrapper aria-label="Details table" fullWidth={!isSm}>
      <TableHeader>
        {labelList.map((label, idx) => (
          <TableColumn key={`${label}-${idx}`}>{label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          {bodyRows.map((content, idx) => (
            <TableCell key={`${content}-${idx}`}>{content}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </NextUITable>
  );
}
