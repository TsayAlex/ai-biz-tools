import "./globals.css";
import Script from "next/script";
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P8HHK6KM9J"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P8HHK6KM9J');
          `}
        </Script>
      </body>
    </html>
  );
}