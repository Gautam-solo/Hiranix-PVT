/** Brand, factory and contact facts shared by every page below the hero. */

export const contact = {
  phone: "+91 79844 62764",
  phoneHref: "tel:+917984462764",
  email: "contact@hiranix.in",
  address: "198, Hirachandni Muvadi, Nr. Ghodasar Canal, Mehmedabad 387110, Gujarat",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=198%2C%20Hirachandni%20Muvadi%2C%20Nr.Ghodasar%20Canal%2C%20Mehmedabad-387110",
  /** Keyless Google Maps embed centred on the same address. */
  mapEmbed:
    "https://www.google.com/maps?q=198%20Hirachandni%20Muvadi%2C%20Nr.%20Ghodasar%20Canal%2C%20Mehmedabad%2C%20Gujarat%20387110&z=14&output=embed",
};

/** The one enquiry action on the site, optionally about a named product. */
export const whatsappHref = (product?: string) =>
  `https://wa.me/917984462764?text=${encodeURIComponent(
    product
      ? `Hello HIRANIX, I would like a quote for ${product}. Size: , Quantity: `
      : "Hello HIRANIX, I would like a quote for: ",
  )}`;

export const brands = [
  {
    name: "Tejas Craft",
    image: "/assets/hiranix/brands/tejas-craft.jpg",
    copy: "Traditional craftsmanship paired with dependable performance for professionals and builders.",
  },
  {
    name: "Hi-Tech Square",
    image: "/assets/hiranix/brands/hi-tech-square.jpg",
    copy: "Modern electrical thinking developed for connected, contemporary spaces.",
  },
  {
    name: "Essemark",
    image: "/assets/hiranix/brands/essemark.jpg",
    copy: "A focused identity within the wider HIRANIX electrical and hardware portfolio.",
  },
];

/** The production floor, in the order a product moves through it. */
export const factory = [
  {
    title: "Injection moulding",
    copy: "Boxes, clamps and enclosures are moulded on long rows of machines.",
    src: "/assets/hiranix/factory/injection-moulding-floor.jpg",
    alt: "Long row of HIRANIX injection moulding machines",
  },
  {
    title: "Wire forming",
    copy: "Steel wire is formed and cut into nails and clips.",
    src: "/assets/hiranix/factory/wire-forming-floor.jpg",
    alt: "Wire forming machines across the HIRANIX production floor",
  },
  {
    title: "Heat treatment",
    copy: "Metal fasteners are hardened so they drive straight and hold.",
    src: "/assets/hiranix/factory/heat-treatment-line.jpg",
    alt: "Industrial heat treatment line for metal fasteners",
  },
  {
    title: "Finishing",
    copy: "Products are finished before they are counted.",
    src: "/assets/hiranix/factory/finishing-line.jpg",
    alt: "Automated finishing line inside the HIRANIX facility",
  },
  {
    title: "Packing",
    copy: "Every order is counted, packed and dispatched.",
    src: "/assets/hiranix/factory/packaging-line.jpg",
    alt: "HIRANIX automated packaging machinery",
  },
];

export type EnquiryLine = { name: string; size: string; qty: string };

/** One readable line per item: "1. Concrete Nail, 3.2 x 25 (1 inch), Qty: 50 boxes". */
export const enquiryText = (items: EnquiryLine[]) =>
  [
    "Hello HIRANIX, I would like a quote for:",
    "",
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.name}${item.size ? `, ${item.size}` : ""}${item.qty.trim() ? `, Qty: ${item.qty.trim()}` : ""}`,
    ),
    "",
    "Name / company: ",
    "City: ",
  ].join("\n");

export const whatsappListHref = (items: EnquiryLine[]) =>
  `https://wa.me/917984462764?text=${encodeURIComponent(enquiryText(items))}`;

export const mailtoListHref = (items: EnquiryLine[]) =>
  `mailto:${contact.email}?subject=${encodeURIComponent("Product enquiry list")}&body=${encodeURIComponent(enquiryText(items))}`;
