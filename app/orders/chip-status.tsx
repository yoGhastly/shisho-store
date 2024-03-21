'use client';

import { Chip } from '@nextui-org/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export type Status = 'In progress' | 'Idle' | 'No status';

interface Props {
  status: Status;
  text?: string;
}

export function StatusChip({ status, text }: Props) {
  const isSm = useMediaQuery(480);
  const colorStatus =
    status === 'In progress'
      ? 'success'
      : status === 'Idle'
        ? 'warning'
        : 'default';

  return (
    <Chip color={colorStatus} variant="flat" size={isSm ? 'sm' : 'md'}>
      {text ? text : status}
    </Chip>
  );
}
