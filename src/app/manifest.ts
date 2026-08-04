import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HIRANIX",
    short_name: "HIRANIX",
    description:
      "Electrical fittings, fasteners and enclosures engineered for dependable performance.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a08",
    theme_color: "#070a08",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
