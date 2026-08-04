import type { Metadata } from "next";
import ProductCatalogue from "@/components/ProductCatalogue";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products | Electrical Fittings, Fasteners & Enclosures",
  description: `Explore ${products.length} HIRANIX electrical fittings, cable management products, fasteners, pipe supports, enclosures, and installation essentials with technical selection data.`,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "HIRANIX Product System",
    description:
      "Technical product information for HIRANIX electrical fittings, fasteners, enclosures, and installation essentials.",
    url: "/products",
    images: [
      {
        url: "/seo/og.png",
        width: 1200,
        height: 630,
        alt: "HIRANIX product system",
      },
    ],
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "HIRANIX Product Range",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: [
        `https://hiranix.in${product.image}`,
        `https://hiranix.in${product.alternateImage}`,
      ],
      category: product.category,
      brand: {
        "@type": "Brand",
        name: "HIRANIX",
      },
      url: `https://hiranix.in/products/${product.slug}`,
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductCatalogue />
    </>
  );
}
