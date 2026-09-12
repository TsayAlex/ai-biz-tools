import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig } from "../lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AI Biz Tools — Practical AI tools for small business",
    template: "%s | AI Biz Tools"
  },
  description: "Find practical AI tools by business type and task. Curated software, comparisons and guides for small businesses.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AI Biz Tools",
    title: "AI Biz Tools — Practical AI tools for small business",
    description: "Independent, practical AI software discovery for small businesses.",
    url: "/"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
