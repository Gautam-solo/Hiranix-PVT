import Image from "next/image";

type HiranixLogoProps = {
  className?: string;
  priority?: boolean;
};

export function HiranixLogo({ className, priority = false }: HiranixLogoProps) {
  return (
    <Image
      className={className}
      src="/assets/hiranix/hiranix-logo.png"
      alt="HIRANIX"
      width={219}
      height={87}
      priority={priority}
      unoptimized
    />
  );
}
