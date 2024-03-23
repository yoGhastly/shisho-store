import clsx from 'clsx';
import { ReactNode } from 'react';

export const TimelineItemDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={clsx('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};
