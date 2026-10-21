import Link from "next/link";
export const metadata = {
  title: "AI Tool Comparisons for Small Business",
  description: "Compare AI tools by business task, workflow overlap and buying criteria before choosing a subscription.",
  alternates: { canonical: "/compare" },
  openGraph: { title: "AI Tool Comparisons for Small Business", description: "Compare workflow fit before buying.", url: "/compare" }
};
export default function Comparisons() {
  return <main className="detail-page">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Compare</div>
    <section className="business-hero"><span className="eyebrow">COMPARE BEFORE BUYING</span><h1>AI tool comparisons for small business</h1><p>Choose by the work you need to do. Compare overlap, correction time and total cost before adding another subscription.</p></section>
    <section className="content-grid">
      <article className="content-card"><h2><Link href="/compare/chatgpt-vs-claude-for-small-business">ChatGPT vs Claude</Link></h2><p>Compare general AI assistants for writing, documents, research and team workflows.</p></article>
      <article className="content-card"><h2><Link href="/compare/zapier-vs-chatgpt">Zapier vs ChatGPT</Link></h2><p>Understand where app automation and an AI assistant solve different problems.</p></article>
    </section>
    <section className="content-card wide"><h2>Check value before subscribing</h2><Link href="/guides/ai-workflow-value-calculator">Try the free workflow value calculator →</Link></section>
  </main>;
}
