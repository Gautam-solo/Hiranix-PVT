import type { Metadata } from "next";
import { LegalPage } from "@/components/routes/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Website terms for hiranix.in by Hiranix India Private Limited.",
  alternates: { canonical: "/legal/terms-conditions" },
};

export default function TermsConditionsPage() {
  return <LegalPage kind="terms" />;
}
