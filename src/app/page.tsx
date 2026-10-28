import { HiranixHero } from "@/components/HiranixHero";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandsChapter, ContactChapter, IntroChapter } from "@/components/home/Chapters";
import { FactoryStory } from "@/components/home/FactoryStory";
import { Marquee } from "@/components/home/Marquee";
import { SystemsRail } from "@/components/home/SystemsRail";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <div className="hx">
          <HiranixHero />
        </div>
        {/* Below the hero: the claim, who we are, products, factory, brands,
            contact. Black, bone and green take turns as the ground. */}
        <div id="site-content" data-chapters>
          <Marquee text="World’s largest manufacturer of cable nail clips" />
          <IntroChapter />
          <SystemsRail />
          <FactoryStory />
          <BrandsChapter />
          <ContactChapter />
        </div>
      </main>
      <SiteFooter currentPath="/" />
    </>
  );
}
