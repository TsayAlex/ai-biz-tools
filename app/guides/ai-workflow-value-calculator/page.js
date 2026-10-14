import Link from "next/link";
import WorkflowValueCalculator from "../../../components/WorkflowValueCalculator";

export const metadata = {
  title: "Free AI workflow time-savings calculator for Irish small businesses",
  description: "Calculate a transparent, editable scenario for the time and software cost of a repetitive business task. Free, private, no signup.",
  alternates: { canonical: "/guides/ai-workflow-value-calculator" }
};

export default function FreeWorkflowCalculator() {
  return <main className="detail-page">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Workflow value calculator</div>
    <section className="business-hero contractor-hero">
      <span className="eyebrow">FREE PRACTICAL TOOL • IRELAND • NO SIGNUP</span>
      <h1>Could AI save your small business time?</h1>
      <p>Estimate the value of improving one repetitive task before buying another monthly subscription. Try customer emails, content preparation or basic administration.</p>
    </section>
    <WorkflowValueCalculator />
    <section className="content-card wide value-article">
      <h2>How to use the result responsibly</h2>
      <ol>
        <li>Pick one clearly defined task you actually repeat. Time five real examples and use the average minutes.</li>
        <li>Estimate conservatively what percentage of that task a tool could help with. AI still needs review and correction.</li>
        <li>Use an honest hourly value. Saved staff time is not automatically extra income or profit.</li>
        <li>Count all costs: subscriptions, training, editing, setup and any extra support.</li>
        <li>Test for two weeks, compare real before-and-after times, and stop if the tool is not useful.</li>
      </ol>
      <h2>Example: an Irish service business</h2>
      <p>Imagine writing 15 similar customer replies each week. If a reply currently takes 20 minutes and a reviewed template saves half of that time, the scenario frees about 2.5 hours per week. At an illustrative €20 per hour and €15 monthly software cost, the calculated value of time is about €202 per month. <strong>This is not a forecast of revenue.</strong> The results can be lower, zero or negative when measured on actual work.</p>
      <h2>Privacy and practical limitations</h2>
      <p>Do not paste customers’ names, addresses, medical information or confidential business records into unfamiliar tools. Use dummy examples when evaluating software, check Irish and EU data protection obligations, and keep a person responsible for decisions and messages.</p>
      <div className="faq-list">
        <details><summary>Is this a promise that AI will save me money?</summary><p>No. It is a simple mathematical scenario based on numbers you enter. We do not measure your business or know your actual subscription prices.</p></details>
        <details><summary>Does this calculator store the numbers I enter?</summary><p>No. The arithmetic runs inside your browser; you do not need an account and it does not transmit your inputs to our server.</p></details>
        <details><summary>Which tool should I choose first?</summary><p>Start by describing one recurring job, then compare free or low-cost options. Use our <Link href="/#finder">three-question tool finder</Link> and read the complete tool review before purchasing.</p></details>
      </div>
    </section>
    <section className="final-cta">
      <h2>One real workflow. One honest test.</h2>
      <p>Start small, record the real time saved and compare alternatives before signing up for software.</p>
      <Link className="primary big" href="/#finder">Find three tools to compare →</Link>
    </section>
  </main>;
}
