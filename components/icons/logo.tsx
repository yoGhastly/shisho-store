import Image from "next/image";

export default function LogoIcon({ className }: { className: string }) {
  return (
    <Image
      src="/logo_2.svg"
      width={24}
      height={24}
      alt={`${process.env.SITE_NAME} logo`}
      className={className}
    />
  );
}
