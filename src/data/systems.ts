import { products, type ProductCategory } from "@/data/products";

/** The five product systems, in the order the site presents them. */
export const systems: {
  category: ProductCategory;
  line: string;
  image: string;
}[] = [
  {
    category: "Cable management",
    line: "Clips, clamps, ties and tape that keep every cable run neat, tight and secure.",
    image: "/assets/hiranix/products/cable-nail-clip-01.jpg",
  },
  {
    category: "Enclosures",
    line: "Junction boxes, MCB boxes and distribution boards that protect every connection.",
    image: "/assets/hiranix/products/metal-junction-box-01.jpg",
  },
  {
    category: "Fasteners",
    line: "Hardened concrete nails and wall plugs that hold firm in brick, block and concrete.",
    image: "/assets/hiranix/products/concrete-nail-01.jpg",
  },
  {
    category: "Pipe support",
    line: "UPVC and CPVC clamps that keep plumbing lines straight, spaced and fixed.",
    image: "/assets/hiranix/products/plastic-upvc-clamp-01.jpg",
  },
  {
    category: "Installation",
    line: "End plugs and fan sheets that finish an installation cleanly.",
    image: "/assets/hiranix/products/round-sheet-01.jpg",
  },
];

export const productsIn = (category: ProductCategory) =>
  products.filter((product) => product.category === category);

export const categoryHref = (category: ProductCategory) =>
  `/products?category=${encodeURIComponent(category)}`;

