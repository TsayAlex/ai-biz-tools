import Link from "next/link";

export const metadata = {
  title:"AI guides for small business",
  description:"Practical, free small-business AI guides: compare subscriptions, calculate workflow value and test customer-enquiry automation with human review.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Practical AI Guides for Small Business",
    description: "Free guides to evaluate AI subscriptions, estimate workflow value and safely test customer-enquiry automation.",
    url: "/guides",
    type: "website"
  }
};

const guides = [
  ["How to choose your first AI tool","Start with a workflow, not a logo. Identify repetitive work, estimate its cost and test one tool against it."],
  ["How to avoid paying for overlapping AI subscriptions","Map what each tool actually does before adding another monthly subscription."],
  ["A simple AI policy for a small team","Decide what data can be shared, when human review is required, and who is responsible for outputs."],
  ["How to measure whether an AI tool is worth paying for","Track time saved, errors, conversion impact and subscription cost for a real workflow."]
];

export default function Guides() {
  return (
    <main className="detail-page">
      <section className="business-hero">
        <span className="eyebrow">PRACTICAL GUIDES</span>
        <h1>Use AI like a business tool, not a collection hobby</h1>
        <p>Short, practical guidance for testing tools against real work.</p>
      </section>
      <section className="content-card wide">
        <span className="eyebrow">FREE INTERACTIVE TOOL • EN / RU / UA</span>
        <h2>Could one AI workflow be worth the subscription?</h2>
        <p>Run your own private, editable time-savings scenario. No signup, and no guaranteed profit claims.</p>
        <Link className="primary inline" href="/guides/ai-workflow-value-calculator">Try the workflow value calculator →</Link>
      </section>
      <section className="content-card wide">
        <span className="eyebrow">REAL-WORLD TWO-WEEK PLAN • FREE</span>
        <h2>How to test AI for customer enquiries without risking trust</h2>
        <p>A step-by-step experiment: measure a manual baseline, draft one safe template, have a person check each reply and compare the actual result. Includes privacy reminders and a link to our free calculator.</p>
        <Link className="primary inline" href="/guides/automate-customer-enquiries-small-business">Read the two-week guide →</Link>
      </section>
      <section className="guide-list">
        {guides.map(([t,d],i)=><article className="guide-card" key={t}><span>0{i+1}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}
      </section>
      <section className="notice">These guide topics are editorial starting points. Expand priority guides with original examples, screenshots where useful, current references and strong internal links before relying on them for organic search.</section>
    </main>
  );
}
