import Link from "next/link";

export const metadata = {
  title:"AI guides for small business",
  description:"Practical guides for choosing and using AI tools in a small business."
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
      <section className="guide-list">
        {guides.map(([t,d],i)=><article className="guide-card" key={t}><span>0{i+1}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}
      </section>
      <section className="notice">These guide topics are editorial starting points. Expand priority guides with original examples, screenshots where useful, current references and strong internal links before relying on them for organic search.</section>
    </main>
  );
}
