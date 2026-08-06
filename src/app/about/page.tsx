import type { Metadata } from "next";
import { About3 } from "@/components/ui/about-3";
import { CATALOGUE_SIZE_LABEL } from "@/data/catalogue";
import { productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Hiranix India Private Limited, an Ahmedabad-based company focused on practical electrical fittings, fasteners, cable management and enclosures.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About HIRANIX",
    description:
      "A connected range of practical electrical fittings, fasteners and enclosures.",
    url: "/about",
    images: [
      {
        url: "/assets/hiranix/factory/injection-moulding-floor.jpg",
        alt: "HIRANIX manufacturing floor",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <About3
      title="Built on practical products."
      description="Hiranix India Private Limited brings frequently used electrical and installation products into one clear range, helping trade customers select and source with confidence."
      mainImage={{
        src: "/assets/hiranix/factory/injection-moulding-floor.jpg",
        alt: "HIRANIX injection moulding production floor",
      }}
      secondaryImage={{
        src: "/assets/hiranix/factory/fastener-assembly-line.jpg",
        alt: "HIRANIX automated fastener assembly and feeding machinery",
      }}
      breakout={{
        src: "/assets/hiranix/footer-wordmark.png",
        alt: "HIRANIX",
        title: "One range for every fix.",
        description:
          "Review product formats, materials and available selection data in the HIRANIX catalogue.",
        buttonText: `Download catalogue (${CATALOGUE_SIZE_LABEL})`,
      }}
      systemsTitle="A connected product system"
      systems={productCategories.slice(1)}
      achievementsTitle="Scale built over time."
      achievementsDescription="Manufacturing depth, global delivery and long-standing product experience."
      achievements={[
        {
          label: "Manufacturer of cable nail clips",
          value: "World's largest",
        },
        { label: "Deliveries", value: "Worldwide" },
        { label: "Years of experience", value: "15+" },
      ]}
      contact={{
        address: "198, Abhishree Estate, Odhav, Ahmedabad - 382415",
        phone: "+91 79844 62764",
        email: "contact@hiranix.in",
      }}
    />
  );
}
