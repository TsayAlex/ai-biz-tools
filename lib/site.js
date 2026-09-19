export const siteConfig = {
  name: "AI Biz Tools",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ai-biz-tools.vercel.app",
  description: "Practical AI software discovery, comparisons and buyer guides for small businesses."
};

export const absoluteUrl = (path = "/") =>
  `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
