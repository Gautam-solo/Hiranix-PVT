"use client";

import { useState } from "react";
import { Photo } from "@/components/system/Photo";
import styles from "./ProductDetail.module.css";

type PhotoItem = { src: string; alt: string; label: string };

/** One large photo, and a thumbnail for each view to switch to it. */
export function ProductPhotos({ photos }: { photos: PhotoItem[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.photos} data-reveal="rise" data-atf="">
      <div className={`frame ${styles.mainPhoto}`}>
        {photos.map((photo, i) => (
          <Photo
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={1122}
            height={1402}
            sizes="(max-width: 900px) 92vw, 50vw"
            priority={i === 0}
            data-current={i === current ? "" : undefined}
            aria-hidden={i === current ? undefined : true}
          />
        ))}
      </div>

      {photos.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label="Product views">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={styles.thumb}
              aria-pressed={i === current}
              aria-label={`Show ${photo.label}`}
              onClick={() => setCurrent(i)}
            >
              <span className="frame">
                <Photo src={photo.src} alt="" width={256} height={320} sizes="96px" />
              </span>
              <span>{photo.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
