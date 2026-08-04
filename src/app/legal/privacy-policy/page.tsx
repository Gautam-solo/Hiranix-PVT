import type { Metadata } from "next";
import { LegalPage } from "@/components/routes/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Hiranix India Private Limited handles information on hiranix.in.",
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage kind="privacy" />;
}
