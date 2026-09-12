export const metadata = { title:"About AI Biz Tools", description:"What AI Biz Tools is, who it is for, and how we approach software recommendations." };

export default function About() {
  return <main className="detail-page">
    <section className="business-hero"><span className="eyebrow">ABOUT</span><h1>AI software discovery for small businesses</h1><p>AI Biz Tools is designed to help small teams compare software around real business jobs: marketing, sales, support, content, research and automation.</p></section>
    <section className="content-grid">
      <article className="content-card"><h2>What we publish</h2><p>Practical tool reviews, buyer guides, business-specific shortlists and direct comparisons. The goal is to reduce wasted subscriptions and help readers test tools against real workflows.</p></article>
      <article className="content-card"><h2>What we avoid</h2><p>Fake testimonials, invented hands-on claims, guaranteed ROI and rankings that exist only because a vendor pays a commission.</p></article>
    </section>
  </main>;
}