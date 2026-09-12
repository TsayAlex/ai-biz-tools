export const metadata = { title:"Editorial methodology", description:"How AI Biz Tools evaluates AI software for small businesses." };

const criteria = [
  ["Business fit","Does the product solve a clear, recurring job for a small business?"],
  ["Ease of adoption","Can a solo owner or lean team get useful results without excessive setup?"],
  ["Workflow value","Can it save time, improve quality, reduce missed work or make a process easier to repeat?"],
  ["Overlap risk","Does the tool duplicate software a business is likely to already pay for?"],
  ["Limitations","What human review, setup, privacy or process constraints should a buyer understand?"],
  ["Commercial neutrality","Affiliate or sponsored relationships must not determine editorial order."]
];

export default function Methodology() {
  return <main className="detail-page">
    <section className="business-hero"><span className="eyebrow">EDITORIAL METHODOLOGY</span><h1>How we evaluate AI tools</h1><p>Scores are directional editorial signals, not scientific measurements. A tool can be excellent and still be the wrong purchase for a particular workflow.</p></section>
    <section className="guide-list">{criteria.map(([t,d],i)=><article className="guide-card" key={t}><span>0{i+1}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}</section>
    <section className="notice"><b>Before purchase:</b> Features, limits and pricing change frequently. Check the vendor's current documentation and run a real workflow test before committing.</section>
  </main>;
}