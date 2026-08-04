import ProductShowcase from "@/components/ProductShowcase";
import { HiranixHero } from "@/components/HiranixHero";
import SocialFooter from "@/components/SocialFooter";
import StoryGallery from "@/components/StoryGallery";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <div className="hx">
          <HiranixHero />
        </div>
        <div id="site-content">
          <StoryGallery />
          <ProductShowcase />
          <SocialFooter />
        </div>
      </main>
    </>
  );
}
