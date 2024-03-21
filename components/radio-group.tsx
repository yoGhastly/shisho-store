'use client';
import React, { useCallback, useEffect } from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function StatusOrderRadioGroup() {
  const [selected, setSelected] = React.useState('In progress');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const queryString = createQueryString('status', selected);
    router.replace(
      `${process.env.NEXT_PUBLIC_SITE_URL}/admin?${queryString}`,
      { scroll: false },
    );
  }, [createQueryString, router, pathname, selected]);

  return (
    <div className="flex gap-2">
      <RadioGroup
        label="Select Order Status"
        orientation="horizontal"
        onValueChange={setSelected}
      >
        <Radio value="In progress" color="success">
          In progress
        </Radio>
        <Radio
          value="Idle"
          color="warning"
          isDisabled={selected.includes('Idle')}
        >
          Idle
        </Radio>
        <Radio
          value="No status"
          color="default"
          isDisabled={selected.includes('No status')}
        >
          No status
        </Radio>
      </RadioGroup>
    </div>
  );
}
