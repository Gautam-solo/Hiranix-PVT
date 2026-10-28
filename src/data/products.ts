export type ProductCategory =
  | "Fasteners"
  | "Cable management"
  | "Pipe support"
  | "Enclosures"
  | "Installation";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductRow = {
  variant: string;
  pack: string;
  master: string;
  detail: string;
};

export type ProductTechnicalData = {
  columns: string[];
  rows: string[][];
  carton?: string;
};

export type HiranixProduct = {
  slug: string;
  name: string;
  category: ProductCategory;
  index: string;
  image: string;
  alternateImage: string;
  statement: string;
  description: string;
  applications: string[];
  features: string[];
  specs: ProductSpec[];
  columns: [string, string, string, string];
  rows: ProductRow[];
  technical: ProductTechnicalData;
  catalogueVerified: boolean;
};

type BaseProduct = Omit<HiranixProduct, "technical">;

/**
 * Product photos are cut out onto the site's off-white with a soft contact
 * shadow (public/assets/hiranix/products/studio). A product with only one
 * view repeats it, and the tiles then skip the hover swap.
 */
const studio = (name: string) => `/assets/hiranix/products/studio/${name}.jpg`;

const hasSecondView = new Set([
  "cable-nail-clip",
  "cctv-camera-box",
  "concrete-nail",
  "double-nail-clamp",
  "fr-pvc-tape",
  "mcb-box",
  "mcb-distribution-push-button",
  "metal-junction-box",
  "modular-gang-box",
  "nylon-cable-tie",
  "open-surface-box",
  "round-sheet",
  "wall-plug-gitti",
]);

const images = (slug: string) => ({
  image: studio(`${slug}-01`),
  alternateImage: studio(hasSecondView.has(slug) ? `${slug}-02` : `${slug}-01`),
});

export const productCategories = [
  "All",
  "Fasteners",
  "Cable management",
  "Pipe support",
  "Enclosures",
  "Installation",
] as const;

const baseProducts = [
  {
    slug: "concrete-nail",
    name: "Concrete Nail",
    category: "Fasteners",
    index: "01",
    ...images("concrete-nail"),
    statement: "A direct fixing for firm masonry and concrete surfaces.",
    description:
      "A high-grade hardened-steel fastener engineered to fix wood, metal, and installation materials directly to concrete, brick, block, and masonry. Its sharp point supports clean penetration while the hardened body resists bending during installation.",
    applications: ["Electrical installation", "Wood-to-masonry fixing", "Metal-to-concrete fixing", "General construction"],
    features: ["Hardened-steel construction", "Sharp penetration point", "Ten catalogue sizes", "Resistant to bending during installation"],
    specs: [
      { label: "Material", value: "High-grade hardened steel" },
      { label: "Length range", value: "25 mm to 100 mm" },
      { label: "Diameter range", value: "3.2 mm to 5.0 mm" },
      { label: "Box weight", value: "850 g" },
    ],
    columns: ["Size", "Box weight", "Master", "Length × diameter"],
    rows: [
      { variant: "3.2 × 25 (1 inch)", pack: "850 g", master: "25 boxes", detail: "25 × 3.2 mm" },
      { variant: "3.6 × 38 (1½ inch)", pack: "850 g", master: "25 boxes", detail: "38 × 3.6 mm" },
      { variant: "4.0 × 38 (1½ inch)", pack: "850 g", master: "25 boxes", detail: "38 × 4.0 mm" },
      { variant: "5.0 × 38 (1½ inch)", pack: "850 g", master: "25 boxes", detail: "38 × 5.0 mm" },
      { variant: "3.6 × 50 (2 inch)", pack: "850 g", master: "25 boxes", detail: "50 × 3.6 mm" },
      { variant: "4.0 × 50 (2 inch)", pack: "850 g", master: "25 boxes", detail: "50 × 4.0 mm" },
      { variant: "5.0 × 50 (2 inch)", pack: "850 g", master: "25 boxes", detail: "50 × 5.0 mm" },
      { variant: "4.0 × 63 (2½ inch)", pack: "850 g", master: "25 boxes", detail: "63 × 4.0 mm" },
      { variant: "4.0 × 75 (3 inch)", pack: "850 g", master: "25 boxes", detail: "75 × 4.0 mm" },
      { variant: "5.0 × 100 (4 inch)", pack: "850 g", master: "25 boxes", detail: "100 × 5.0 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "mcb-distribution-push-button",
    name: "MCB Distribution Push Button",
    category: "Enclosures",
    index: "02",
    // The second photo leads on the product page and in the range; the first follows it.
    image: studio("mcb-distribution-push-button-02"),
    alternateImage: studio("mcb-distribution-push-button-01"),
    statement: "Organised circuit distribution with a practical push-button cover.",
    description:
      "An electrical distribution enclosure designed to house miniature circuit breakers and support structured routing of protected circuits in residential, commercial, and light industrial installations.",
    applications: ["Circuit distribution", "MCB protection", "Residential and commercial panels"],
    features: ["Push-button access", "ABS front construction", "Metal base support"],
    specs: [
      { label: "Front material", value: "100% virgin ABS" },
      { label: "Base", value: "Mild steel" },
      { label: "Catalogue range", value: "2x4 to 16x18" },
    ],
    columns: ["Size", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "2x4", pack: "1 pc", master: "64 pcs", detail: "420 g" },
      { variant: "6x8", pack: "1 pc", master: "48 pcs", detail: "630 g" },
      { variant: "10x12", pack: "1 pc", master: "32 pcs", detail: "820 g" },
      { variant: "16x18", pack: "1 pc", master: "24 pcs", detail: "1030 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "db-elite",
    name: "DB Elite",
    category: "Enclosures",
    index: "03",
    ...images("db-elite"),
    statement: "A refined distribution enclosure for visible interiors.",
    description:
      "A galvanised-iron distribution enclosure for organised circuit protection in residential, commercial, and industrial installations. The Elite range combines a clean service face with brass terminals and capacity for 4 to 16 MCB ways.",
    applications: ["Apartment distribution", "Office fit-outs", "Commercial circuit protection", "Industrial electrical systems"],
    features: ["Galvanised-iron construction", "Brass terminals", "Six MCB configurations", "Accessible service layout"],
    specs: [
      { label: "Body", value: "Galvanised iron" },
      { label: "Terminals", value: "Brass" },
      { label: "MCB capacity", value: "4 way to 16 way" },
      { label: "Pack", value: "1 pc per box" },
    ],
    columns: ["MCB capacity", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "4 way", pack: "1 pc", master: "24 boxes", detail: "1.20 kg" },
      { variant: "6 way", pack: "1 pc", master: "20 boxes", detail: "1.30 kg" },
      { variant: "8 way", pack: "1 pc", master: "18 boxes", detail: "1.50 kg" },
      { variant: "10 way", pack: "1 pc", master: "16 boxes", detail: "1.70 kg" },
      { variant: "12 way", pack: "1 pc", master: "12 boxes", detail: "1.90 kg" },
      { variant: "16 way", pack: "1 pc", master: "10 boxes", detail: "2.25 kg" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "mcb-box",
    name: "MCB Box",
    category: "Enclosures",
    index: "04",
    ...images("mcb-box"),
    statement: "Compact protection for individual breaker configurations.",
    description:
      "A compact enclosure for miniature circuit breakers, designed to keep live components covered while retaining practical access for installation and servicing.",
    applications: ["Local circuit protection", "Small distribution points", "Residential wiring"],
    features: ["Compact format", "Plastic or metal base options", "Two fixing screws"],
    specs: [
      { label: "Body material", value: "100% virgin PVC" },
      { label: "Base options", value: "Plastic or metal" },
      { label: "Catalogue sizes", value: "1/2, 3/4, and 2/4" },
    ],
    columns: ["Size", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "1/2, plastic base", pack: "20 pcs", master: "480 pcs", detail: "50 g" },
      { variant: "3/4, plastic base", pack: "10 pcs", master: "240 pcs", detail: "77 g" },
      { variant: "1/2, metal base", pack: "20 pcs", master: "480 pcs", detail: "71 g" },
      { variant: "2/4, metal base", pack: "10 pcs", master: "240 pcs", detail: "114 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "wall-plug-gitti",
    name: "Wall Plug Gitti",
    category: "Fasteners",
    index: "05",
    ...images("wall-plug-gitti"),
    statement: "Expansion support for reliable screw fixing in suitable walls.",
    description:
      "A ribbed wall anchor that expands as the screw is driven, helping the fixing grip the drilled hole. Use the correct drill size and assess the wall material and load before installation.",
    applications: ["Electrical accessory mounting", "Light fixtures", "General wall fixing"],
    features: ["Ribbed expansion body", "100% virgin HDPE", "Three heavy-duty lengths"],
    specs: [
      { label: "Material", value: "100% virgin HDPE" },
      { label: "Pack format", value: "25 or 50 pcs" },
      { label: "Catalogue range", value: "35 mm to 50 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Pack weight"],
    rows: [
      { variant: "35 mm heavy", pack: "50 pcs", master: "350 packs", detail: "41.5 g" },
      { variant: "40 mm heavy", pack: "50 pcs", master: "280 packs", detail: "57 g" },
      { variant: "50 mm heavy", pack: "25 pcs", master: "220 packs", detail: "64 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "upvc-end-plug",
    name: "UPVC End Plug",
    category: "Installation",
    index: "06",
    ...images("upvc-end-plug"),
    statement: "A neat closure for compatible UPVC conduit ends.",
    description:
      "A precision-moulded 15 mm end plug that provides a secure, durable, and leak-resistant closure for compatible UPVC piping. It protects pipe ends during installation, pressure testing, maintenance, and planned extensions.",
    applications: ["UPVC pipe-end sealing", "Pressure testing", "Installation protection", "Future pipeline extensions"],
    features: ["Virgin HDPE body", "Rubber O-ring seal", "65 mm overall length", "Corrosion and moisture resistant"],
    specs: [
      { label: "Material", value: "100% virgin HDPE" },
      { label: "Seal", value: "Rubber O-ring" },
      { label: "Nominal size", value: "15 mm" },
      { label: "Length", value: "65 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Pack weight / length"],
    rows: [
      { variant: "UPVC end plug — 15 mm", pack: "50 pcs", master: "40 packs", detail: "300 g / 65 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "plastic-upvc-clamp",
    name: "Plastic UPVC Clamp",
    category: "Pipe support",
    index: "07",
    ...images("plastic-upvc-clamp"),
    statement: "Rigid support for orderly UPVC pipe runs.",
    description:
      "A nail-fixed plastic clamp for securing UPVC pipework commonly used in cold-water, drainage, and construction applications. Spacing should follow the pipe system and site conditions.",
    applications: ["UPVC pipe support", "Drainage routing", "Cold-water installations"],
    features: ["Virgin HDPE body", "MS nail fixing", "Six catalogue sizes"],
    specs: [
      { label: "Body", value: "100% virgin HDPE" },
      { label: "Fastener", value: "Mild steel nail" },
      { label: "Catalogue range", value: "1/2 inch to 2 inch" },
    ],
    columns: ["Size", "Pack", "Master", "Nail size"],
    rows: [
      { variant: "UPVC 1/2", pack: "100 pcs", master: "140 packs", detail: "2.7 x 45 mm" },
      { variant: "UPVC 3/4", pack: "100 pcs", master: "100 packs", detail: "3.3 x 55 mm" },
      { variant: "UPVC 1", pack: "100 pcs", master: "80 packs", detail: "3.3 x 65 mm" },
      { variant: "UPVC 1 1/4", pack: "100 pcs", master: "60 packs", detail: "3.3 x 70 mm" },
      { variant: "UPVC 1 1/2", pack: "100 pcs", master: "50 packs", detail: "3.3 x 80 mm" },
      { variant: "UPVC 2", pack: "100 pcs", master: "35 packs", detail: "3.8 x 90 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "nylon-cable-tie",
    name: "Nylon Cable Tie",
    category: "Cable management",
    index: "08",
    ...images("nylon-cable-tie"),
    statement: "Fast, consistent bundling for cables and installation materials.",
    description:
      "A PA66 ratchet tie for grouping and securing cables, wires, and lightweight installation items. Select length and width around bundle diameter, handling, and site requirements.",
    applications: ["Cable bundling", "Panel organisation", "General installation management"],
    features: ["PA66 construction", "One-way ratchet lock", "Broad size range"],
    specs: [
      { label: "Material", value: "PA66 with antioxidants" },
      { label: "Pack", value: "100 pcs" },
      { label: "Catalogue lengths", value: "100 mm to 450 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Width"],
    rows: [
      { variant: "CT-100X1.8", pack: "100 pcs", master: "600 packs", detail: "1.8 mm" },
      { variant: "CT-100X2.5", pack: "100 pcs", master: "400 packs", detail: "2.5 mm" },
      { variant: "CT-150X2.5", pack: "100 pcs", master: "300 packs", detail: "2.5 mm" },
      { variant: "CT-150X3.6", pack: "100 pcs", master: "200 packs", detail: "3.6 mm" },
      { variant: "CT-200X2.5", pack: "100 pcs", master: "240 packs", detail: "2.5 mm" },
      { variant: "CT-200X3.0", pack: "100 pcs", master: "200 packs", detail: "3.0 mm" },
      { variant: "CT-200X3.6", pack: "100 pcs", master: "180 packs", detail: "3.6 mm" },
      { variant: "CT-200X4.8", pack: "100 pcs", master: "140 packs", detail: "4.8 mm" },
      { variant: "CT-250X3.0", pack: "100 pcs", master: "140 packs", detail: "3.0 mm" },
      { variant: "CT-250X3.6", pack: "100 pcs", master: "120 packs", detail: "3.6 mm" },
      { variant: "CT-250X4.8", pack: "100 pcs", master: "100 packs", detail: "4.8 mm" },
      { variant: "CT-300X3.2", pack: "100 pcs", master: "140 packs", detail: "3.2 mm" },
      { variant: "CT-300X3.6", pack: "100 pcs", master: "100 packs", detail: "3.6 mm" },
      { variant: "CT-300X4.8", pack: "100 pcs", master: "100 packs", detail: "4.8 mm" },
      { variant: "CT-350X3.6", pack: "100 pcs", master: "100 packs", detail: "3.6 mm" },
      { variant: "CT-350X4.8", pack: "100 pcs", master: "80 packs", detail: "4.8 mm" },
      { variant: "CT-400X3.6", pack: "100 pcs", master: "80 packs", detail: "3.6 mm" },
      { variant: "CT-400X4.8", pack: "100 pcs", master: "80 packs", detail: "4.8 mm" },
      { variant: "CT-450X4.8", pack: "100 pcs", master: "60 packs", detail: "4.8 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "db-magnum",
    name: "DB Magnum",
    category: "Enclosures",
    index: "09",
    ...images("db-magnum"),
    statement: "A substantial distribution format for organised circuit layouts.",
    description:
      "A robust galvanised-iron distribution enclosure for larger organised breaker layouts. The Magnum range uses brass terminals and supports 4 to 16 MCB ways across residential, commercial, and industrial electrical systems.",
    applications: ["Multi-circuit distribution", "Commercial fit-outs", "Industrial circuit protection", "Project electrical systems"],
    features: ["Galvanised-iron construction", "Brass terminals", "Six MCB configurations", "Higher-capacity enclosure format"],
    specs: [
      { label: "Body", value: "Galvanised iron" },
      { label: "Terminals", value: "Brass" },
      { label: "MCB capacity", value: "4 way to 16 way" },
      { label: "Pack", value: "1 pc per box" },
    ],
    columns: ["MCB capacity", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "4 way", pack: "1 pc", master: "24 boxes", detail: "1.30 kg" },
      { variant: "6 way", pack: "1 pc", master: "20 boxes", detail: "1.60 kg" },
      { variant: "8 way", pack: "1 pc", master: "18 boxes", detail: "1.70 kg" },
      { variant: "10 way", pack: "1 pc", master: "16 boxes", detail: "1.95 kg" },
      { variant: "12 way", pack: "1 pc", master: "12 boxes", detail: "2.20 kg" },
      { variant: "16 way", pack: "1 pc", master: "10 boxes", detail: "2.60 kg" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "open-surface-box",
    name: "Open Surface Box",
    category: "Enclosures",
    index: "10",
    ...images("open-surface-box"),
    statement: "Accessible surface mounting for modular electrical fittings.",
    description:
      "A HIPS surface box with brass terminals, designed for convenient wiring access and a neat modular installation in residential, commercial, and light industrial settings.",
    applications: ["Surface wiring", "Modular switches and sockets", "Retrofit installations"],
    features: ["Virgin HIPS body", "Brass terminals", "Nine modular formats"],
    specs: [
      { label: "Body", value: "100% virgin HIPS" },
      { label: "Terminals", value: "Brass" },
      { label: "Catalogue range", value: "2 to 18 modular" },
    ],
    columns: ["Size", "Box", "Master", "Terminals"],
    rows: [
      { variant: "2 modular", pack: "20 pcs", master: "640 pcs", detail: "2" },
      { variant: "3 modular", pack: "10 pcs", master: "560 pcs", detail: "2" },
      { variant: "4 modular", pack: "10 pcs", master: "480 pcs", detail: "2" },
      { variant: "6 modular", pack: "10 pcs", master: "320 pcs", detail: "2" },
      { variant: "8 modular horizontal", pack: "10 pcs", master: "300 pcs", detail: "4" },
      { variant: "8 modular square", pack: "10 pcs", master: "300 pcs", detail: "4" },
      { variant: "12 modular", pack: "10 pcs", master: "200 pcs", detail: "4" },
      { variant: "16 modular", pack: "5 pcs", master: "150 pcs", detail: "4" },
      { variant: "18 modular", pack: "5 pcs", master: "160 pcs", detail: "6" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "round-sheet",
    name: "Round Sheet",
    category: "Installation",
    index: "11",
    ...images("round-sheet"),
    statement: "Lightweight insulating sheet stock for site and fabrication use.",
    description:
      "A circular HDPE and nylon sheet format for insulating, spacing, covering, or light fabrication applications where a durable, moisture-resistant polymer surface is useful.",
    applications: ["Insulating components", "Spacers and covers", "Light fabrication"],
    features: ["HDPE and nylon material family", "2 mm catalogue thickness", "Two round formats"],
    specs: [
      { label: "Material", value: "HDPE and nylon" },
      { label: "Thickness", value: "2 mm" },
      { label: "Pack", value: "100 pcs" },
    ],
    columns: ["Size", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "3.5 x 3.5 inch", pack: "100 pcs", master: "20 boxes", detail: "11 g" },
      { variant: "4 x 4 inch", pack: "100 pcs", master: "20 boxes", detail: "15 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "fr-pvc-tape",
    name: "FR PVC Tape",
    category: "Cable management",
    index: "12",
    ...images("fr-pvc-tape"),
    statement: "Flexible insulation and identification for everyday electrical work.",
    description:
      "A flame-retardant PVC insulation tape using rubber adhesive for wire insulation, bundling, and colour identification across electrical, automotive, and machinery installations.",
    applications: ["Wire insulation", "Cable bundling", "Colour identification"],
    features: ["FR PVC backing", "Rubber adhesive", "Multiple colour options"],
    specs: [
      { label: "Material", value: "FR PVC granules" },
      { label: "Adhesive", value: "Rubber adhesive" },
      { label: "Catalogue lengths", value: "6 m and 15 m" },
    ],
    columns: ["Length", "Box", "Master", "Box weight"],
    rows: [
      { variant: "6 metres", pack: "30 pcs", master: "20 boxes", detail: "660 g" },
      { variant: "15 metres", pack: "20 pcs", master: "20 boxes", detail: "900 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "cpvc-end-plug",
    name: "CPVC End Plug",
    category: "Installation",
    index: "13",
    ...images("cpvc-end-plug"),
    statement: "A compact closure for compatible CPVC routes and fittings.",
    description:
      "A precision-moulded 15 mm end plug that provides a secure, durable, and leak-resistant closure for compatible CPVC piping. It is suited to hot- and cold-water systems during installation, pressure testing, maintenance, and planned extensions.",
    applications: ["CPVC pipe-end sealing", "Hot and cold water systems", "Pressure testing", "Future pipeline extensions"],
    features: ["Virgin HDPE body", "Rubber O-ring seal", "65 mm overall length", "Chemical and corrosion resistant"],
    specs: [
      { label: "Material", value: "100% virgin HDPE" },
      { label: "Seal", value: "Rubber O-ring" },
      { label: "Nominal size", value: "15 mm" },
      { label: "Length", value: "65 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Pack weight / length"],
    rows: [
      { variant: "CPVC end plug — 15 mm", pack: "50 pcs", master: "40 packs", detail: "300 g / 65 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "cable-nail-clip",
    name: "Cable Nail Clip",
    category: "Cable management",
    index: "14",
    ...images("cable-nail-clip"),
    statement: "A quick, tidy fixing for visible cable runs.",
    description:
      "A virgin HDPE clip with an integrated mild-steel nail for securing cables to suitable walls, ceilings, and baseboards. The range covers round, flat, oval, and batten profiles.",
    applications: ["Surface cable routing", "Residential wiring", "Commercial cable management"],
    features: ["Integrated MS nail", "Virgin HDPE clip", "Round and batten formats"],
    specs: [
      { label: "Clip material", value: "100% virgin HDPE" },
      { label: "Nail", value: "Mild steel" },
      { label: "Catalogue range", value: "4 mm to 25 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Nail size"],
    rows: [
      { variant: "4 mm", pack: "100 pcs", master: "750 packs", detail: "1.6 x 16 mm" },
      { variant: "5 mm", pack: "100 pcs", master: "550 packs", detail: "1.6 x 16 mm" },
      { variant: "6 mm", pack: "100 pcs", master: "450 packs", detail: "1.6 x 16 mm" },
      { variant: "7 mm", pack: "100 pcs", master: "400 packs", detail: "1.8 x 19 mm" },
      { variant: "8 mm", pack: "100 pcs", master: "300 packs", detail: "1.8 x 19 mm" },
      { variant: "9 mm", pack: "100 pcs", master: "220 packs", detail: "2.0 x 23 mm" },
      { variant: "10 mm", pack: "100 pcs", master: "200 packs", detail: "2.0 x 23 mm" },
      { variant: "12 mm", pack: "100 pcs", master: "140 packs", detail: "2.3 x 25 mm" },
      { variant: "14 mm", pack: "100 pcs", master: "100 packs", detail: "2.3 x 31 mm" },
      { variant: "16 mm", pack: "100 pcs", master: "80 packs", detail: "2.3 x 31 mm" },
      { variant: "18 mm", pack: "100 pcs", master: "60 packs", detail: "2.7 x 38 mm" },
      { variant: "20 mm", pack: "100 pcs", master: "50 packs", detail: "2.7 x 38 mm" },
      { variant: "25 mm", pack: "100 pcs", master: "35 packs", detail: "2.7 x 45 mm" },
      { variant: "Batten round", pack: "100 pcs", master: "750 packs", detail: "1.6 x 16 mm" },
      { variant: "Batten flat", pack: "100 pcs", master: "700 packs", detail: "1.6 x 16 mm" },
      { variant: "Batten oval", pack: "50 pcs", master: "700 packs", detail: "1.8 x 19 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "plastic-cpvc-clamp",
    name: "Plastic CPVC Clamp",
    category: "Pipe support",
    index: "15",
    ...images("plastic-cpvc-clamp"),
    statement: "Stable CPVC pipe support for hot and cold water routes.",
    description:
      "A nail-fixed HDPE clamp for supporting CPVC pipes used in hot and cold water services and compatible industrial routes. Choose size and spacing around the pipe system and site conditions.",
    applications: ["CPVC pipe support", "Hot and cold water routing", "Building services"],
    features: ["Virgin HDPE body", "MS nail fixing", "Five catalogue sizes"],
    specs: [
      { label: "Body", value: "100% virgin HDPE" },
      { label: "Fastener", value: "Mild steel nail" },
      { label: "Catalogue range", value: "3/4 inch to 2 inch" },
    ],
    columns: ["Size", "Pack", "Master", "Nail size"],
    rows: [
      { variant: "CPVC 3/4", pack: "100 pcs", master: "35 packs", detail: "2.7 x 45 mm" },
      { variant: "CPVC 1", pack: "100 pcs", master: "20 packs", detail: "3.3 x 55 mm" },
      { variant: "CPVC 1 1/4", pack: "50 pcs", master: "24 packs", detail: "3.3 x 65 mm" },
      { variant: "CPVC 1 1/2", pack: "25 pcs", master: "40 packs", detail: "3.3 x 80 mm" },
      { variant: "CPVC 2", pack: "25 pcs", master: "24 packs", detail: "3.8 x 90 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "modular-gang-box",
    name: "Modular Gang Box",
    category: "Enclosures",
    index: "16",
    ...images("modular-gang-box"),
    statement: "Flexible surface housing for modular switches, sockets, and data points.",
    description:
      "A virgin ABS surface enclosure for modular electrical and communication devices. Multiple sizes support different plate arrangements in residential, commercial, and industrial interiors.",
    applications: ["Switch and socket mounting", "Data point housing", "Surface electrical work"],
    features: ["Virgin ABS body", "MS fixing screws", "Plain and silver finishes"],
    specs: [
      { label: "Body", value: "100% virgin ABS" },
      { label: "Fasteners", value: "Mild steel screws" },
      { label: "Catalogue range", value: "1 to 18 modular" },
    ],
    columns: ["Size", "Box", "Master", "Screws"],
    rows: [
      { variant: "1 modular", pack: "10 pcs", master: "690 pcs", detail: "2" },
      { variant: "2 modular", pack: "10 pcs", master: "490 pcs", detail: "2" },
      { variant: "3 modular", pack: "10 pcs", master: "380 pcs", detail: "2" },
      { variant: "4 modular", pack: "10 pcs", master: "310 pcs", detail: "2" },
      { variant: "6 modular", pack: "10 pcs", master: "210 pcs", detail: "2" },
      { variant: "8 modular horizontal", pack: "10 pcs", master: "150 pcs", detail: "4" },
      { variant: "8 modular square", pack: "5 pcs", master: "180 pcs", detail: "4" },
      { variant: "9 modular", pack: "10 pcs", master: "150 pcs", detail: "4" },
      { variant: "12 modular", pack: "5 pcs", master: "150 pcs", detail: "4" },
      { variant: "16 modular", pack: "5 pcs", master: "120 pcs", detail: "4" },
      { variant: "18 modular", pack: "5 pcs", master: "105 pcs", detail: "4" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "metal-junction-box",
    name: "Metal Junction Box",
    category: "Enclosures",
    index: "17",
    ...images("metal-junction-box"),
    statement: "A rigid metal enclosure for protected electrical connections.",
    description:
      "A robust metal box intended to house switches, sockets, wiring connections, and related fittings where impact resistance and a secure mechanical housing are priorities.",
    applications: ["Concealed electrical work", "Connection protection", "Residential and industrial projects"],
    features: ["Rigid metal construction", "Multiple modular sizes", "Preformed cable entries"],
    specs: [
      { label: "Construction", value: "Metal enclosure" },
      { label: "Catalogue range", value: "2 to 18 modular" },
      { label: "Fixings", value: "2 or 4 screws by size" },
    ],
    columns: ["Size", "Box", "Master", "Unit weight"],
    rows: [
      { variant: "2 modular", pack: "20 pcs", master: "200 pcs", detail: "155 g" },
      { variant: "3 modular", pack: "20 pcs", master: "160 pcs", detail: "185 g" },
      { variant: "4 modular", pack: "10 pcs", master: "100 pcs", detail: "230 g" },
      { variant: "6 modular", pack: "10 pcs", master: "100 pcs", detail: "320 g" },
      { variant: "8 modular horizontal", pack: "10 pcs", master: "80 pcs", detail: "360 g" },
      { variant: "8 modular square", pack: "10 pcs", master: "80 pcs", detail: "360 g" },
      { variant: "12 modular", pack: "5 pcs", master: "60 pcs", detail: "470 g" },
      { variant: "16 modular", pack: "5 pcs", master: "60 pcs", detail: "530 g" },
      { variant: "18 modular", pack: "5 pcs", master: "60 pcs", detail: "660 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "double-nail-clamp",
    name: "Double Nail Clamp",
    category: "Cable management",
    index: "18",
    ...images("double-nail-clamp"),
    statement: "Two-point stability for larger cable and conduit routes.",
    description:
      "A double-nail clamp that spreads the fixing across two points for improved stability around thicker cables and demanding surface runs.",
    applications: ["Larger cable routes", "Conduit support", "Heavy-duty surface management"],
    features: ["Two-nail fixing", "Six catalogue sizes", "Stable wall support"],
    specs: [
      { label: "Pack format", value: "25 or 50 pcs" },
      { label: "Catalogue range", value: "20 mm to 50 mm" },
      { label: "Nail range", value: "2.7 x 38 mm to 3.8 x 90 mm" },
    ],
    columns: ["Size", "Pack", "Master", "Nail size"],
    rows: [
      { variant: "20 mm double", pack: "50 pcs", master: "65 packs", detail: "2.7 x 38 mm" },
      { variant: "25 mm double", pack: "50 pcs", master: "45 packs", detail: "2.7 x 45 mm" },
      { variant: "32 mm double", pack: "50 pcs", master: "32 packs", detail: "3.3 x 55 mm" },
      { variant: "35 mm double", pack: "50 pcs", master: "24 packs", detail: "3.3 x 65 mm" },
      { variant: "40 mm double", pack: "50 pcs", master: "20 packs", detail: "3.3 x 65 mm" },
      { variant: "50 mm double", pack: "25 pcs", master: "24 packs", detail: "3.8 x 90 mm" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "fan-sheet",
    name: "Fan Sheet",
    category: "Installation",
    index: "19",
    // Same product as the round sheet, shot once — there is no separate
    // fan-sheet photography.
    ...images("round-sheet"),
    statement: "A durable insulating sheet for fan mounting and fabrication work.",
    description:
      "A lightweight HDPE and nylon fan sheet designed for insulating, spacing, covering, and fabrication applications. Its moisture resistance, mechanical strength, wear resistance, and dimensional stability support dependable installation in demanding environments.",
    applications: ["Ceiling fan mounting", "Electrical insulation", "Fabricated covers and spacers", "Building-services installation"],
    features: ["HDPE and nylon construction", "2 mm catalogue thickness", "Smooth machinable surface", "Two catalogue sizes"],
    specs: [
      { label: "Material", value: "HDPE and nylon" },
      { label: "Thickness", value: "2 mm" },
      { label: "Size range", value: "6 x 6 to 7 x 7 inches" },
      { label: "Pack", value: "100 pcs" },
    ],
    columns: ["Size", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "6 x 6 inch", pack: "100 pcs", master: "20 boxes", detail: "71 g" },
      { variant: "7 x 7 inch", pack: "100 pcs", master: "20 boxes", detail: "114 g" },
    ],
    catalogueVerified: true,
  },
  {
    slug: "cctv-camera-box",
    name: "CCTV Camera Box",
    category: "Enclosures",
    index: "20",
    ...images("cctv-camera-box"),
    // Re-shot Aug 2026. The image optimizer serves with
    // `Cache-Control: immutable, max-age=1y`, so replacing a file at the same
    // URL stays invisible to any browser that already fetched it — new
    // photography needs a new filename, not just new bytes.
    image: studio("cctv-camera-box-01-v2"),
    alternateImage: studio("cctv-camera-box-02-v2"),
    statement: "A protected, professional enclosure for CCTV camera connections.",
    description:
      "A virgin PP protective enclosure for CCTV camera wiring and connections. The box helps shield installation components from dust, rain, heat, and tampering while providing cable-entry and mounting provisions for straightforward service and maintenance.",
    applications: ["Residential CCTV installation", "Commercial surveillance", "Outdoor camera connections", "Industrial security systems"],
    features: ["100% virgin PP construction", "Cable-entry provision", "Mounting holes", "Two catalogue sizes"],
    specs: [
      { label: "Material", value: "100% virgin PP" },
      { label: "Size range", value: "4 x 4 to 5 x 5 inches" },
      { label: "Pack", value: "20 pcs" },
      { label: "Function", value: "Camera connection protection" },
    ],
    columns: ["Size", "Pack", "Master", "Unit weight"],
    rows: [
      { variant: "4 x 4 inch", pack: "20 pcs", master: "27 boxes", detail: "55 g" },
      { variant: "5 x 5 inch", pack: "20 pcs", master: "18 boxes", detail: "85 g" },
    ],
    catalogueVerified: true,
  },
] satisfies BaseProduct[];

const catalogueTechnicalData: Record<string, ProductTechnicalData> = {
  "concrete-nail": {
    columns: ["Size", "Box weight", "Boxes / master", "Master weight", "Length", "Diameter"],
    rows: [
      ["3.2 x 25 (1 inch)", "850 g", "25", "21.50 kg", "25 mm", "3.2 mm"],
      ["3.6 x 38 (1 1/2 inch)", "850 g", "25", "21.50 kg", "38 mm", "3.6 mm"],
      ["4.0 x 38 (1 1/2 inch)", "850 g", "25", "21.50 kg", "38 mm", "4.0 mm"],
      ["5.0 x 38 (1 1/2 inch)", "850 g", "25", "21.50 kg", "38 mm", "5.0 mm"],
      ["3.6 x 50 (2 inch)", "850 g", "25", "21.50 kg", "50 mm", "3.6 mm"],
      ["4.0 x 50 (2 inch)", "850 g", "25", "21.50 kg", "50 mm", "4.0 mm"],
      ["5.0 x 50 (2 inch)", "850 g", "25", "21.50 kg", "50 mm", "5.0 mm"],
      ["4.0 x 63 (2 1/2 inch)", "850 g", "25", "21.50 kg", "63 mm", "4.0 mm"],
      ["4.0 x 75 (3 inch)", "850 g", "25", "21.50 kg", "75 mm", "4.0 mm"],
      ["5.0 x 100 (4 inch)", "850 g", "25", "21.50 kg", "100 mm", "5.0 mm"],
    ],
    carton: "35 x 20 x 26.5 inches",
  },
  "mcb-distribution-push-button": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "Screws"],
    rows: [
      ["2 x 4", "1", "64", "420 g", "26.90 kg", "0"],
      ["6 x 8", "1", "48", "630 g", "30.25 kg", "0"],
      ["10 x 12", "1", "32", "820 g", "26.25 kg", "0"],
      ["16 x 18", "1", "24", "1030 g", "24.75 kg", "0"],
    ],
  },
  "db-elite": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "MCB ways"],
    rows: [
      ["4 way", "1", "24", "1.20 kg", "29.00 kg", "4"],
      ["6 way", "1", "20", "1.30 kg", "26.00 kg", "6"],
      ["8 way", "1", "18", "1.50 kg", "27.00 kg", "8"],
      ["10 way", "1", "16", "1.70 kg", "27.50 kg", "10"],
      ["12 way", "1", "12", "1.90 kg", "23.00 kg", "12"],
      ["16 way", "1", "10", "2.25 kg", "22.50 kg", "16"],
    ],
  },
  "mcb-box": {
    columns: ["Size / base", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "Screws"],
    rows: [
      ["1/2 - plastic", "20", "480", "50 g", "24.00 kg", "2"],
      ["3/4 - plastic", "10", "240", "77 g", "18.50 kg", "2"],
      ["1/2 - metal", "20", "480", "71 g", "34.00 kg", "2"],
      ["2/4 - metal", "10", "240", "114 g", "27.40 kg", "2"],
    ],
  },
  "wall-plug-gitti": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Catalogue thickness"],
    rows: [
      ["35 mm heavy", "50", "350", "41.50 g", "14.50 kg", "-"],
      ["40 mm heavy", "50", "280", "57.00 g", "16.00 kg", "-"],
      ["50 mm heavy", "25", "220", "64.00 g", "14.50 kg", "-"],
    ],
    carton: "20 x 5.5 x 38 inches",
  },
  "upvc-end-plug": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Length"],
    rows: [["UPVC end plug - 15 mm", "50", "40", "300 g", "12.00 kg", "65 mm"]],
    carton: "20 x 5.5 x 38 inches",
  },
  "plastic-upvc-clamp": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Nail size"],
    rows: [
      ["UPVC 1/2", "100", "140", "779.50 g", "27.00 kg", "2.7 x 45 mm"],
      ["UPVC 3/4", "100", "100", "1260.00 g", "25.00 kg", "3.3 x 55 mm"],
      ["UPVC 1", "100", "80", "1701.50 g", "23.50 kg", "3.3 x 65 mm"],
      ["UPVC 1 1/4", "100", "60", "1107.50 g", "22.00 kg", "3.3 x 70 mm"],
      ["UPVC 1 1/2", "100", "50", "654.50 g", "20.50 kg", "3.3 x 80 mm"],
      ["UPVC 2", "100", "35", "970.00 g", "19.50 kg", "3.8 x 90 mm"],
    ],
    carton: "20 x 5.5 x 38 inches",
  },
  "nylon-cable-tie": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Width"],
    rows: [
      ["CT-100X1.8", "100", "600", "20 g", "14.55 kg", "1.8 mm"],
      ["CT-100X2.5", "100", "400", "25 g", "11.70 kg", "2.5 mm"],
      ["CT-150X2.5", "100", "300", "35 g", "12.40 kg", "2.5 mm"],
      ["CT-150X3.6", "100", "200", "55 g", "12.25 kg", "3.6 mm"],
      ["CT-200X2.5", "100", "240", "50 g", "13.75 kg", "2.5 mm"],
      ["CT-200X3.0", "100", "200", "55 g", "12.45 kg", "3.0 mm"],
      ["CT-200X3.6", "100", "180", "75 g", "14.81 kg", "3.6 mm"],
      ["CT-200X4.8", "100", "140", "100 g", "15.00 kg", "4.8 mm"],
      ["CT-250X3.0", "100", "140", "80 g", "12.35 kg", "3.0 mm"],
      ["CT-250X3.6", "100", "120", "90 g", "11.80 kg", "3.6 mm"],
      ["CT-250X4.8", "100", "100", "120 g", "12.85 kg", "4.8 mm"],
      ["CT-300X3.2", "100", "140", "85 g", "13.20 kg", "3.2 mm"],
      ["CT-300X3.6", "100", "100", "110 g", "11.95 kg", "3.6 mm"],
      ["CT-300X4.8", "100", "100", "150 g", "15.95 kg", "4.8 mm"],
      ["CT-350X3.6", "100", "100", "125 g", "13.55 kg", "3.6 mm"],
      ["CT-350X4.8", "100", "80", "160 g", "13.65 kg", "4.8 mm"],
      ["CT-400X3.6", "100", "80", "170 g", "14.50 kg", "3.6 mm"],
      ["CT-400X4.8", "100", "80", "200 g", "16.90 kg", "4.8 mm"],
      ["CT-450X4.8", "100", "60", "250 g", "15.75 kg", "4.8 mm"],
    ],
    carton: "19 x 10 x 15 inches",
  },
  "db-magnum": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "MCB ways"],
    rows: [
      ["4 way", "1", "24", "1.30 kg", "31.50 kg", "4"],
      ["6 way", "1", "20", "1.60 kg", "32.00 kg", "6"],
      ["8 way", "1", "18", "1.70 kg", "31.00 kg", "8"],
      ["10 way", "1", "16", "1.95 kg", "31.50 kg", "10"],
      ["12 way", "1", "12", "2.20 kg", "26.50 kg", "12"],
      ["16 way", "1", "10", "2.60 kg", "26.00 kg", "16"],
    ],
  },
  "open-surface-box": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Pcs / master", "Unit weight", "Master weight", "Terminals"],
    rows: [
      ["2 modular", "20", "32", "640", "61.00 g", "40.00 kg", "2"],
      ["3 modular", "10", "56", "560", "72.50 g", "40.50 kg", "2"],
      ["4 modular", "10", "48", "480", "84.50 g", "40.50 kg", "2"],
      ["6 modular", "10", "32", "320", "106.50 g", "34.00 kg", "2"],
      ["8 modular (H)", "10", "30", "300", "134.00 g", "40.20 kg", "4"],
      ["8 modular (SQ)", "10", "30", "300", "115.50 g", "34.65 kg", "4"],
      ["12 modular", "10", "20", "200", "160.50 g", "32.10 kg", "4"],
      ["16 modular", "5", "30", "150", "195.50 g", "29.50 kg", "4"],
      ["18 modular", "5", "32", "160", "210.00 g", "33.60 kg", "6"],
    ],
    carton: "35 x 20 x 26.5 inches",
  },
  "round-sheet": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "Thickness"],
    rows: [
      ["3.5 x 3.5 inch", "100", "20", "11.00 g", "22.00 kg", "2 mm"],
      ["4 x 4 inch", "100", "20", "15.00 g", "30.00 kg", "2 mm"],
    ],
  },
  "fr-pvc-tape": {
    columns: ["Length", "Pcs / box", "Boxes / master", "Box weight", "Master weight", "Catalogue thickness"],
    rows: [
      ["6 metres", "30", "20", "660.00 g", "13.50 kg", "16 mm"],
      ["15 metres", "20", "20", "900.00 g", "18.00 kg", "16 mm"],
    ],
    carton: "19 x 10 x 15 inches",
  },
  "cpvc-end-plug": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Length"],
    rows: [["CPVC end plug - 15 mm", "50", "40", "300 g", "12.00 kg", "65 mm"]],
    carton: "20 x 5.5 x 38 inches",
  },
  "cable-nail-clip": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Nail size"],
    rows: [
      ["4 mm", "100", "750", "40.00 g", "30.00 kg", "1.6 x 16 mm"],
      ["5 mm", "100", "550", "45.00 g", "24.50 kg", "1.6 x 16 mm"],
      ["6 mm", "100", "450", "50.00 g", "22.50 kg", "1.6 x 16 mm"],
      ["7 mm", "100", "400", "70.00 g", "27.00 kg", "1.8 x 19 mm"],
      ["8 mm", "100", "300", "80.00 g", "24.50 kg", "1.8 x 19 mm"],
      ["9 mm", "100", "220", "115.00 g", "25.50 kg", "2.0 x 23 mm"],
      ["10 mm", "100", "200", "120.00 g", "23.50 kg", "2.0 x 23 mm"],
      ["12 mm", "100", "140", "195.00 g", "27.50 kg", "2.3 x 25 mm"],
      ["14 mm", "100", "100", "235.00 g", "23.50 kg", "2.3 x 31 mm"],
      ["16 mm", "100", "80", "290.00 g", "23.00 kg", "2.3 x 31 mm"],
      ["18 mm", "100", "60", "375.00 g", "22.50 kg", "2.7 x 38 mm"],
      ["20 mm", "100", "50", "420.00 g", "21.00 kg", "2.7 x 38 mm"],
      ["25 mm", "100", "35", "560.00 g", "20.00 kg", "2.7 x 45 mm"],
      ["Batten round", "100", "750", "40.00 g", "30.00 kg", "1.6 x 16 mm"],
      ["Batten flat", "100", "700", "40.00 g", "28.00 kg", "1.6 x 16 mm"],
      ["Batten oval", "50", "700", "40.00 g", "28.00 kg", "1.8 x 19 mm"],
    ],
    carton: "20 x 5.5 x 38 inches",
  },
  "plastic-cpvc-clamp": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Nail size"],
    rows: [
      ["CPVC 3/4", "100", "35", "799.00 g", "27.50 kg", "2.7 x 45 mm"],
      ["CPVC 1", "100", "20", "1230.00 g", "24.50 kg", "3.3 x 55 mm"],
      ["CPVC 1 1/4", "50", "24", "892.50 g", "21.50 kg", "3.3 x 65 mm"],
      ["CPVC 1 1/2", "25", "40", "595.50 g", "23.50 kg", "3.3 x 80 mm"],
      ["CPVC 2", "25", "24", "875.50 g", "21.00 kg", "3.8 x 90 mm"],
    ],
    carton: "20 x 5.5 x 38 inches",
  },
  "modular-gang-box": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Pcs / master", "Unit weight", "Master weight", "Screws"],
    rows: [
      ["1 modular", "10", "69", "690", "40.00 g", "28.00 kg", "2"],
      ["2 modular", "10", "49", "490", "50.00 g", "25.00 kg", "2"],
      ["3 modular", "10", "38", "380", "60.00 g", "23.00 kg", "2"],
      ["4 modular", "10", "31", "310", "70.00 g", "22.00 kg", "2"],
      ["6 modular", "10", "21", "210", "85.00 g", "18.00 kg", "2"],
      ["8 modular (H)", "10", "15", "150", "110.00 g", "17.00 kg", "4"],
      ["8 modular (SQ)", "5", "36", "180", "115.00 g", "21.00 kg", "4"],
      ["9 modular", "10", "15", "150", "120.00 g", "18.50 kg", "4"],
      ["12 modular", "5", "30", "150", "125.00 g", "19.00 kg", "4"],
      ["16 modular", "5", "24", "120", "170.00 g", "21.00 kg", "4"],
      ["18 modular", "5", "21", "105", "185.00 g", "20.00 kg", "4"],
    ],
    carton: "35 x 20 x 26.5 inches",
  },
  "metal-junction-box": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Pcs / master", "Unit weight", "Master weight", "Screws"],
    rows: [
      ["2 modular", "20", "10", "200", "155.00 g", "31.00 kg", "2"],
      ["3 modular", "20", "8", "160", "185.00 g", "29.60 kg", "2"],
      ["4 modular", "10", "10", "100", "230.00 g", "23.00 kg", "2"],
      ["6 modular", "10", "10", "100", "320.00 g", "32.00 kg", "2"],
      ["8 modular (H)", "10", "8", "80", "360.00 g", "28.80 kg", "2"],
      ["8 modular (SQ)", "10", "8", "80", "360.00 g", "28.80 kg", "4"],
      ["12 modular", "5", "12", "60", "470.00 g", "28.20 kg", "4"],
      ["16 modular", "5", "12", "60", "530.00 g", "31.80 kg", "4"],
      ["18 modular", "5", "12", "60", "660.00 g", "39.60 kg", "4"],
    ],
    carton: "35 x 20 x 26.5 inches",
  },
  "double-nail-clamp": {
    columns: ["Size", "Pcs / packet", "Packets / master", "Packet weight", "Master weight", "Nail size"],
    rows: [
      ["20 mm double", "50", "65", "349.00 g", "22.50 kg", "2.7 x 38 mm"],
      ["25 mm double", "50", "45", "449.00 g", "20.50 kg", "2.7 x 45 mm"],
      ["32 mm double", "50", "32", "768.00 g", "24.50 kg", "3.3 x 55 mm"],
      ["35 mm double", "50", "24", "887.00 g", "21.50 kg", "3.3 x 65 mm"],
      ["40 mm double", "50", "20", "1020.00 g", "20.50 kg", "3.3 x 65 mm"],
      ["50 mm double", "25", "24", "808.00 g", "19.50 kg", "3.8 x 90 mm"],
    ],
    carton: "20 x 5.5 x 38 inches",
  },
  "fan-sheet": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "Thickness"],
    rows: [
      ["6 x 6 inch", "100", "20", "71.00 g", "52.50 kg", "2 mm"],
      ["7 x 7 inch", "100", "20", "114.00 g", "42.00 kg", "2 mm"],
    ],
  },
  "cctv-camera-box": {
    columns: ["Size", "Pcs / box", "Boxes / master", "Unit weight", "Master weight", "Thickness"],
    rows: [
      ["4 x 4 inch", "20", "27", "55.00 g", "30.00 kg", "-"],
      ["5 x 5 inch", "20", "18", "85.00 g", "30.50 kg", "-"],
    ],
  },
};

export const productVariants: HiranixProduct[] = baseProducts.map((product) => {
  const technical = catalogueTechnicalData[product.slug];

  if (!technical || technical.columns.length === 0 || technical.rows.length === 0) {
    throw new Error(`Missing catalogue technical data for ${product.slug}`);
  }

  const invalidRow = technical.rows.find((row) => row.length !== technical.columns.length);
  if (invalidRow) {
    throw new Error(`Incomplete catalogue technical row for ${product.slug}`);
  }

  return { ...product, technical };
});

const variantBySlug = new Map(productVariants.map((product) => [product.slug, product]));

function requireVariant(slug: string) {
  const product = variantBySlug.get(slug);
  if (!product) throw new Error(`Missing product variant for ${slug}`);
  return product;
}

const combineTechnicalData = (
  variants: Array<{ label: string; slug: string }>,
): ProductTechnicalData => {
  const first = requireVariant(variants[0].slug).technical;

  return {
    columns: ["Range", ...first.columns],
    rows: variants.flatMap(({ label, slug }) =>
      requireVariant(slug).technical.rows.map((row) => [label, ...row]),
    ),
    carton: variants
      .map(({ slug }) => requireVariant(slug).technical.carton)
      .find(Boolean),
  };
};

const distributionBox: HiranixProduct = {
  ...requireVariant("db-elite"),
  slug: "elite-magnum-distribution-box",
  name: "Elite / Magnum Distribution Box",
  alternateImage: requireVariant("db-magnum").image,
  statement: "Two distribution-box ranges for organised, dependable circuit protection.",
  description:
    "The HIRANIX Elite and Magnum ranges bring their distinct construction and weight specifications into one distribution-box family. Both are designed for organised residential, commercial, and industrial circuit protection, with brass terminals and configurations from 4 to 16 MCB ways.",
  applications: ["Residential distribution", "Commercial circuit protection", "Office fit-outs", "Industrial electrical systems"],
  features: ["Elite and Magnum variants", "Brass terminals", "Six MCB configurations per range", "4-way to 16-way capacity"],
  specs: [
    { label: "Available ranges", value: "Elite and Magnum" },
    { label: "Terminals", value: "Brass" },
    { label: "MCB capacity", value: "4 way to 16 way" },
    { label: "Pack", value: "1 pc per box" },
  ],
  technical: combineTechnicalData([
    { label: "Elite", slug: "db-elite" },
    { label: "Magnum", slug: "db-magnum" },
  ]),
};

const endPlug: HiranixProduct = {
  ...requireVariant("upvc-end-plug"),
  slug: "upvc-cpvc-end-plug",
  name: "UPVC / CPVC End Plug",
  alternateImage: requireVariant("cpvc-end-plug").image,
  statement: "One secure end-plug family for compatible UPVC and CPVC pipe systems.",
  description:
    "A precision-moulded 15 mm end plug supplied in UPVC and CPVC system variants. The virgin-HDPE body and rubber O-ring provide a durable, leak-resistant closure for pipe ends during installation, pressure testing, maintenance, and planned extensions.",
  applications: ["UPVC and CPVC pipe-end sealing", "Pressure testing", "Installation protection", "Future pipeline extensions"],
  features: ["UPVC and CPVC variants", "Virgin HDPE body", "Rubber O-ring seal", "65 mm overall length"],
  specs: [
    { label: "System variants", value: "UPVC and CPVC" },
    { label: "Material", value: "100% virgin HDPE" },
    { label: "Seal", value: "Rubber O-ring" },
    { label: "Nominal size", value: "15 mm" },
  ],
  technical: combineTechnicalData([
    { label: "UPVC", slug: "upvc-end-plug" },
    { label: "CPVC", slug: "cpvc-end-plug" },
  ]),
};

const plasticPipeClamp: HiranixProduct = {
  ...requireVariant("plastic-upvc-clamp"),
  slug: "plastic-upvc-cpvc-clamp",
  name: "Plastic UPVC / CPVC Clamp",
  alternateImage: requireVariant("plastic-cpvc-clamp").image,
  statement: "One nail-fixed clamp family for orderly UPVC and CPVC pipe runs.",
  description:
    "A nail-fixed plastic support family for compatible UPVC and CPVC pipework. UPVC variants suit common cold-water and drainage runs, while CPVC variants support compatible hot- and cold-water installations. Select the system and size required by the pipe specification and site conditions.",
  applications: ["UPVC pipe support", "CPVC pipe support", "Drainage routing", "Hot- and cold-water installations"],
  features: ["UPVC and CPVC variants", "100% virgin HDPE body", "Mild-steel nail fixing", "Eleven catalogue sizes"],
  specs: [
    { label: "System variants", value: "UPVC and CPVC" },
    { label: "Body", value: "100% virgin HDPE" },
    { label: "Fastener", value: "Mild-steel nail" },
    { label: "Catalogue range", value: "1/2 inch to 2 inch" },
  ],
  technical: combineTechnicalData([
    { label: "UPVC", slug: "plastic-upvc-clamp" },
    { label: "CPVC", slug: "plastic-cpvc-clamp" },
  ]),
};

const roundFanSheet: HiranixProduct = {
  ...requireVariant("round-sheet"),
  slug: "round-fan-sheet",
  name: "Round / Fan Sheet",
  statement: "Round and fan-sheet formats for insulation, spacing, and fabrication work.",
  description:
    "A lightweight insulating-sheet family supplied in compact round-sheet and larger fan-sheet formats. The smooth, moisture-resistant material supports electrical insulation, spacing, covering, fan mounting, and general fabrication applications.",
  applications: ["Ceiling fan mounting", "Electrical insulation", "Fabricated covers", "Spacers and general installation"],
  features: ["Round and fan-sheet formats", "2 mm catalogue thickness", "Moisture-resistant material", "Smooth machinable surface"],
  specs: [
    { label: "Available formats", value: "Round sheet and fan sheet" },
    { label: "Thickness", value: "2 mm" },
    { label: "Size range", value: "3.5 x 3.5 to 7 x 7 inches" },
    { label: "Pack", value: "100 pcs" },
  ],
  technical: combineTechnicalData([
    { label: "Round sheet", slug: "round-sheet" },
    { label: "Fan sheet", slug: "fan-sheet" },
  ]),
};

const groupedSlugs = new Set([
  "db-elite",
  "db-magnum",
  "upvc-end-plug",
  "cpvc-end-plug",
  "plastic-upvc-clamp",
  "plastic-cpvc-clamp",
  "round-sheet",
  "fan-sheet",
]);

const groupedProductByFirstVariant = new Map<string, HiranixProduct>([
  ["db-elite", distributionBox],
  ["upvc-end-plug", endPlug],
  ["plastic-upvc-clamp", plasticPipeClamp],
  ["round-sheet", roundFanSheet],
]);

export const products: HiranixProduct[] = productVariants
  .flatMap((product) => {
    const groupedProduct = groupedProductByFirstVariant.get(product.slug);
    if (groupedProduct) return [groupedProduct];
    return groupedSlugs.has(product.slug) ? [] : [product];
  })
  .map((product, index) => ({
    ...product,
    index: String(index + 1).padStart(2, "0"),
  }));

const legacyProductAliases: Record<string, string> = {
  "db-elite": distributionBox.slug,
  "db-magnum": distributionBox.slug,
  "upvc-end-plug": endPlug.slug,
  "cpvc-end-plug": endPlug.slug,
  "plastic-upvc-clamp": plasticPipeClamp.slug,
  "plastic-cpvc-clamp": plasticPipeClamp.slug,
  "round-sheet": roundFanSheet.slug,
  "fan-sheet": roundFanSheet.slug,
};

export const productRouteSlugs = [
  ...products.map((product) => product.slug),
  ...Object.keys(legacyProductAliases),
];

export function findProductBySlug(slug: string) {
  const canonicalSlug = legacyProductAliases[slug] ?? slug;
  return products.find((product) => product.slug === canonicalSlug);
}
