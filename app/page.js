import Link from "next/link";
import ToolExplorer from "../components/ToolExplorer";
import ToolFinder from "../components/ToolFinder";
import NewsletterForm from "../components/NewsletterForm";
import { businesses } from "../data/tools";

const tasks = [
  ["Marketing","Create campaigns, ads and social content"],
  ["Sales","Manage leads, outreach and follow-up"],
  ["Customer Support","Answer customers faster"],
  ["Automation","Connect apps and remove repetitive work"],
  ["Content","Create useful text, audio and video"],
  ["Productivity","Research, summarize and organize work"]
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-v5">
        <div className="hero-copy">
          <span className="eyebrow">AI FOR SMALL BUSINESS • NO HYPE</span>
          <h1>Find the best AI tools for <em>your business</em></h1>
          <p>Answer three quick questions and get a practical shortlist — then read the review before you spend money.</p>
          <div className="hero-actions">
            <a className="primary big" href="#explore">Browse reviewed tools →</a>
            <a className="secondary big" href="#business">Browse by business</a>
          </div>
          <div className="trust">
            <span>✓ No signup</span>
            <span>✓ Explainable matches</span>
            <span>✓ No fake testimonials</span>
          </div>
          <p className="hero-proof">Use the finder on the right for a shortlist, or browse our reviewed tools below.</p>
        </div>
        <ToolFinder />
      </section>

      <section className="stats">
        <div><strong>12</strong><span>reviewed starter tools</span></div>
        <div><strong>7</strong><span>business types</span></div>
        <div><strong>6</strong><span>core tasks</span></div>
        <div><strong>3</strong><span>personalized matches</span></div>
      </section>

      <section id="business" className="section">
        <span className="eyebrow">START WITH YOUR BUSINESS</span>
        <h2>Useful recommendations, not a giant AI directory</h2>
        <div className="job-grid">
          {businesses.map(b => (
            <Link href={`/business/${b.slug}`} className="job" key={b.slug}>
              <span>{b.icon}</span>
              <div><h3>{b.name}</h3><p>{b.description}</p></div>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section soft">
        <span className="eyebrow">OR START WITH A TASK</span>
        <h2>What do you want AI to help with?</h2>
        <div className="task-grid">
          {tasks.map(([title,desc]) => (
            <a href="#finder" className="task" key={title}>
              <h3>{title}</h3><p>{desc}</p><span>Use the finder →</span>
            </a>
          ))}
        </div>
      </section>

      <ToolExplorer />

      <section className="section compare">
        <div>
          <span className="eyebrow">COMPARE BEFORE YOU BUY</span>
          <h2>Do not pay for overlapping tools</h2>
          <p>Comparison pages focus on the job each product does, who benefits, and where the tools overlap.</p>
          <Link className="primary inline" href="/compare/chatgpt-vs-claude">Compare ChatGPT vs Claude →</Link>
        </div>
        <div className="compare-box">
          <Link href="/compare/chatgpt-vs-claude"><b>ChatGPT</b><span>vs</span><b>Claude</b></Link>
          <Link href="/compare/zapier-vs-chatgpt"><b>Zapier</b><span>vs</span><b>ChatGPT</b></Link>
        </div>
      </section>

      <section id="newsletter" className="section newsletter">
        <div>
          <span className="eyebrow">SMALL BUSINESS AI BRIEF</span>
          <h2>One useful AI workflow each week.</h2>
          <p>The form is UI-only in this prototype. Connect an email provider before launch.</p>
        </div>
        <NewsletterForm />
      </section>
    </main>
  );
}
