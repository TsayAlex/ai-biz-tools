import "./globals.css";
import Script from "next/script";
import AnalyticsConsent from "../components/AnalyticsConsent";
import { GA_CONSENT_BOOTSTRAP } from "../lib/analytics";
import { Analytics } from "@vercel/analytics/next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig } from "../lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AI Biz Tools — Practical AI tools for small business",
    template: "%s | AI Biz Tools"
  },
  description:
    "Find practical AI tools by business type and task. Curated software, comparisons and guides for small businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AI Biz Tools",
    title: "AI Biz Tools — Practical AI tools for small business",
    description:
      "Independent, practical AI software discovery for small businesses.",
    url: "/"
  },
  robots: { index: true, follow: true },
  other: {
  "impact-site-verification": "765e5f49-a504-4504-a4d6-a94631cdb4d0",
}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}

        <Footer />

        <Script id="ga4-consent-default" strategy="beforeInteractive">{GA_CONSENT_BOOTSTRAP}</Script>
        <AnalyticsConsent />

        <Analytics />
      </body>
    </html>
  );
}