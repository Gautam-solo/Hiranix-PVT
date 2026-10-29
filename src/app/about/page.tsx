import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutApp, AboutIntro, AboutManifesto } from "@/components/about/AboutChapters";
import { Verbs } from "@/components/about/Verbs";
import { Promises } from "@/components/about/Promises";
import { ContactChapter } from "@/components/home/Chapters";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Hiranix India Private Limited, a Mehmedabad-based company focused on practical electrical fittings, fasteners, cable management and enclosures.",
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
    <>
      <main id="main-content" tabIndex={-1} data-chapters>
        <AboutIntro />
        <AboutManifesto />
        <Verbs />
        <Promises />
        <AboutApp />
        <ContactChapter />
      </main>
      <SiteFooter currentPath="/about" />
    </>
  );
}
