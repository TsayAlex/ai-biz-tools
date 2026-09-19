import { tools, businesses, comparisons } from "../data/tools";
import { seoPages } from "../data/seoPages";
import { siteConfig } from "../lib/site";

export default function sitemap() {
  const base = siteConfig.url.replace(/\/$/, "");
  const entries = [
    { url: base, changeFrequency:"weekly", priority:1 },
    { url: `${base}/guides`, changeFrequency:"weekly", priority:.7 },
    { url: `${base}/best/best-ai-tools-for-contractors`, changeFrequency:"monthly", priority:1 },
    { url: `${base}/best/best-ai-tools-for-restaurants`, changeFrequency:"monthly", priority:.9 },
    { url: `${base}/best/best-ai-tools-for-real-estate`, changeFrequency:"monthly", priority:.9 },
    { url: `${base}/best/best-ai-tools-for-ecommerce`, changeFrequency:"monthly", priority:.9 },
    { url: `${base}/best/best-ai-tools-for-small-business`, changeFrequency:"monthly", priority:.9 },
    { url: `${base}/compare/chatgpt-vs-claude-for-small-business`, changeFrequency:"monthly", priority:.9 },
    { url: `${base}/about`, changeFrequency:"yearly", priority:.4 },
    { url: `${base}/methodology`, changeFrequency:"yearly", priority:.5 },
    { url: `${base}/affiliate-disclosure`, changeFrequency:"yearly", priority:.2 },
    { url: `${base}/privacy`, changeFrequency:"yearly", priority:.2 },
    { url: `${base}/terms`, changeFrequency:"yearly", priority:.2 },
    { url: `${base}/submit`, changeFrequency:"monthly", priority:.3 },
    ...tools.map(x=>({url:`${base}/tools/${x.slug}`,changeFrequency:"monthly",priority:.8})),
    ...businesses.map(x=>({url:`${base}/business/${x.slug}`,changeFrequency:"monthly",priority:.9})),
    ...comparisons.map(x=>({url:`${base}/compare/${x.slug}`,changeFrequency:"monthly",priority:.8})),
    ...seoPages.map(x=>({url:`${base}/best/${x.slug}`,changeFrequency:"monthly",priority:.9}))
  ];

  const seen = new Map();
  for (const entry of entries) {
    if (!seen.has(entry.url)) {
      seen.set(entry.url, entry);
    }
  }

  return [...seen.values()];
}
