import Link from "next/link";
import { HiranixLogo } from "@/components/HiranixLogo";
import styles from "./LegalPage.module.css";

const updated = "29 October 2026";

const company = {
  name: "Hiranix India Private Limited",
  address: "198, Hirachandni Muvadi, Nr.Ghodasar Canal, Mehmedabad-387110",
  email: "contact@hiranix.in",
  phone: "+91 79844 62764",
};

function LegalHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="HIRANIX home">
        <HiranixLogo className={styles.wordmarkImage} />
      </Link>
      <Link href="/" className={styles.backLink}>
        Back to website <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 HIRANIX. All rights reserved.</span>
      <div>
        <Link href="/legal/privacy-policy">Privacy Policy</Link>
        <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
      </div>
    </footer>
  );
}

function ContactBlock() {
  return (
    <address className={styles.contact}>
      <strong>{company.name}</strong>
      <a
        href="https://www.google.com/maps/search/?api=1&query=198%2C%20Hirachandni%20Muvadi%2C%20Nr.Ghodasar%20Canal%2C%20Mehmedabad-387110"
        target="_blank"
        rel="noopener noreferrer"
      >
        {company.address}
      </a>
      <a href="tel:+917984462764">{company.phone}</a>
      <a href={`mailto:${company.email}`}>{company.email}</a>
    </address>
  );
}

function TermsContent() {
  return (
    <>
      <h1>Terms &amp; Conditions</h1>
      <p className={styles.updated}>Last updated: {updated}</p>
      <p>
        These terms govern your use of hiranix.in, a company and product-information
        website operated by {company.name}. By using the website, you agree to these
        terms. If you do not agree, please stop using the website.
      </p>

      <h2>Website purpose</h2>
      <p>
        Product descriptions, images, specifications and catalogue information are
        provided for general information. Availability, packaging and specifications
        may change. Confirm current details with HIRANIX before relying on them for a
        purchase, project or installation.
      </p>

      <h2>Permitted use</h2>
      <p>
        You may browse and download publicly available material for legitimate
        personal or business evaluation. You must not disrupt the website, introduce
        harmful code, attempt unauthorised access, scrape it at unreasonable scale, or
        use its content in a misleading or unlawful way.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless stated otherwise, the HIRANIX name, product photography, catalogue,
        design and website content belong to {company.name} or are used with
        permission. No ownership rights are transferred by your use of this website.
      </p>

      <h2>External services</h2>
      <p>
        The website links to third-party services including Google Maps, social
        platforms and hiranix.store. Those services operate under their own terms and
        privacy practices. HIRANIX is not responsible for their availability or
        content.
      </p>

      <h2>Availability and liability</h2>
      <p>
        We work to keep the website accurate and available, but do not guarantee that
        it will always be uninterrupted or error-free. Nothing in these terms excludes
        rights or liabilities that cannot legally be excluded.
      </p>

      <h2>Changes</h2>
      <p>
        We may update the website and these terms. The latest version and revision date
        will appear on this page.
      </p>

      <h2>Contact</h2>
      <ContactBlock />
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: {updated}</p>
      <p>
        This policy explains how {company.name} handles information when you visit
        hiranix.in or contact us through the links provided on the website.
      </p>

      <h2>Information you provide</h2>
      <p>
        If you call or email us, we may receive your name, contact details, company
        information and the contents of your enquiry. We use this information to
        respond, provide requested product information and maintain business records.
      </p>

      <h2>Technical information</h2>
      <p>
        Our hosting provider may process basic technical data such as IP address,
        browser type, device type, requested pages and timestamps to deliver, secure
        and maintain the website. This site does not provide account registration or
        an on-site payment form.
      </p>

      <h2>Cookies and information stored on your device</h2>
      <p>
        This website does not set cookies and does not use advertising or analytics
        trackers. Two small items are kept in your own browser, never sent to us: the
        enquiry list you build with &ldquo;Add to enquiry list&rdquo; (product names,
        sizes and quantities you chose), and a note that the opening animation has
        already played during your visit. You can remove them at any time by clearing
        this site&rsquo;s data in your browser.
      </p>

      <h2>Sending an enquiry</h2>
      <p>
        The enquiry list is only sent when you choose to send it, by tapping the
        WhatsApp or email button. The message then travels through your own WhatsApp
        or email application and is subject to that service&rsquo;s privacy policy.
        Nothing is submitted to us from the website itself.
      </p>

      <h2>Embedded map</h2>
      <p>
        The contact section shows a Google Maps map of our factory. When that map
        loads, Google receives technical information from your browser, such as your
        IP address, and may handle it under Google&rsquo;s own privacy policy. The map
        is the only third-party content this website loads automatically.
      </p>

      <h2>Links to other services</h2>
      <p>
        Instagram, Facebook, WhatsApp, Google Maps, the Google Play and Apple App
        Stores, and hiranix.store are external services. When you follow those links,
        their privacy policies apply.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep enquiry and business records only as long as reasonably needed for the
        purpose for which they were received and for legitimate business, security or
        compliance needs. We use reasonable measures to protect information, although
        no internet service can guarantee absolute security.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us about personal information you have provided, request a
        correction, or ask us to stop using it for direct communication. Some records
        may need to be retained where required for legitimate business or legal needs.
      </p>

      <h2>Contact</h2>
      <ContactBlock />
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <div className={styles.page}>
      <LegalHeader />
      <main id="main-content" tabIndex={-1} className={styles.content}>
        {kind === "terms" ? <TermsContent /> : <PrivacyContent />}
      </main>
      <LegalFooter />
    </div>
  );
}
