import Image from "next/image";
import styles from "./brand-image.module.css";

interface BrandImageProps {
  src: string;
  alt: string;
  sizes: string;
}

export function BrandImage({ src, alt, sizes }: BrandImageProps) {
  return (
    <div className={styles.frame}>
      <Image src={src} alt={alt} fill sizes={sizes} className={styles.image} />
    </div>
  );
}
