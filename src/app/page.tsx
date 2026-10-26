import { HiranixHero } from "@/components/HiranixHero";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BrandsChapter,
  ContactChapter,
  ProductsChapter,
  ProofChapter,
} from "@/components/home/Chapters";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <div className="hx">
          <HiranixHero />
        </div>
        {/* Below the hero: products, proof, brands, contact, one colour each. */}
        <div id="site-content" data-chapters>
          <ProductsChapter />
          <ProofChapter />
          <BrandsChapter />
          <ContactChapter />
        </div>
      </main>
      <SiteFooter currentPath="/" />
    </>
  );
}
