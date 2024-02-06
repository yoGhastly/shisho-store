import clsx from "clsx";
import Image from "next/image";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <Image
      src="/logo_2.svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      width={32}
      height={28}
      {...props}
      className={clsx("h-16 w-16", props.className)}
    />
  );
}
