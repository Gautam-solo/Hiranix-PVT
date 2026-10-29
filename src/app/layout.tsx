import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { EnquiryPanel } from "@/components/enquiry/EnquiryPanel";
import { EnquiryProvider } from "@/components/enquiry/EnquiryProvider";
import { ChapterMotion } from "@/components/system/ChapterMotion";
import { Intro } from "@/components/system/Intro";
import { PageCurtain } from "@/components/system/PageCurtain";
import "./hiranix-hero.css";
import "./globals.css";
import "./system.css";

const siteUrl = "https://hiranix.in";

const monaSans = localFont({
  src: "./fonts/MonaSans.woff2",
  variable: "--font-mona-sans",
  weight: "200 900",
  display: "swap",
});

const brier = localFont({
  src: "./fonts/Brier-Bold.woff2",
  variable: "--font-brier",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "HIRANIX",
  title: {
    default: "HIRANIX | Electrical Fittings, Fasteners & Enclosures",
    template: "%s | HIRANIX",
  },
  description:
    "Explore HIRANIX electrical fittings, fasteners and enclosures engineered in India for dependable installation and lasting performance.",
  keywords: [
    "HIRANIX",
    "electrical fittings India",
    "electrical enclosures",
    "cable clips",
    "wall plugs",
    "nylon cable ties",
    "MCB box",
    "junction box",
    "electrical hardware Mehmedabad",
  ],
  authors: [{ name: "Hiranix India Private Limited", url: siteUrl }],
  creator: "Hiranix India Private Limited",
  publisher: "Hiranix India Private Limited",
  category: "Electrical and industrial products",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "HIRANIX | Engineered for Every Fix",
    description:
      "Electrical fittings, fasteners and enclosures engineered in India for dependable performance.",
    url: siteUrl,
    siteName: "HIRANIX",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/seo/og.png",
        width: 1200,
        height: 630,
        alt: "HIRANIX electrical fittings, fasteners and enclosures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIRANIX | Engineered for Every Fix",
    description:
      "Electrical fittings, fasteners and enclosures engineered in India for dependable performance.",
    images: ["/seo/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070a08",
  colorScheme: "dark light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Hiranix India Private Limited",
  alternateName: "HIRANIX",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/seo/og.png`,
  email: "contact@hiranix.in",
  telephone: "+917984462764",
  address: {
    "@type": "PostalAddress",
    streetAddress: "198, Hirachandni Muvadi, Nr.Ghodasar Canal",
    addressLocality: "Mehmedabad",
    addressRegion: "Gujarat",
    postalCode: "387110",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/hiranix.in/",
    "https://www.facebook.com/people/Hiranix/61581637497185/",
    "https://wa.me/917984462764",
    "https://hiranix.store/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "HIRANIX",
  description:
    "Electrical fittings, fasteners and enclosures engineered for dependable performance.",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script below adds `hx-js` before hydration.
    <html lang="en-IN" className={`${monaSans.variable} ${brier.variable}`} suppressHydrationWarning>
      <body>
        {/* Before first paint, so reveal targets start hidden only when the
            script that reveals them can run. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('hx-js');try{if(location.pathname==='/'&&!sessionStorage.getItem('hx-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('hx-intro-on')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <EnquiryProvider>
          <SmoothScroll />
          <ChapterMotion />
          <PageCurtain />
          <Intro />
          <a className="hx-skip-link" href="#main-content">
            Skip to main content
          </a>
          {/* <header> rather than <div>: the site banner had no landmark, so
              screen-reader users had no way to jump past the nav. */}
          <header className="hx hx-site-header">
            <SiteHeader />
          </header>
          {children}
          <EnquiryPanel />
        </EnquiryProvider>
      </body>
    </html>
  );
}
