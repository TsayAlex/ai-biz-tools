"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "../data/tools";
import { track } from "../lib/analytics";

const businessOptions = [
  "Real Estate",
  "Ecommerce",
  "Contractors",
  "Restaurants",
  "Consultants",
  "Agencies",
  "Local Businesses"
];

const taskOptions = [
  { label: "Marketing", categories: ["Marketing", "Content"] },
  { label: "Sales", categories: ["Sales", "Productivity"] },
  { label: "Customer Support", categories: ["Customer Support", "Productivity"] },
  { label: "Automation", categories: ["Automation", "Productivity"] },
  { label: "Content", categories: ["Content", "Marketing", "Productivity"] },
  { label: "Productivity", categories: ["Productivity", "Automation"] }
];

const budgetOptions = [
  { value: "lean", label: "Keep costs low", hint: "Start with versatile tools and avoid overlap." },
  { value: "balanced", label: "Balanced", hint: "Mix general tools with one specialist product." },
  { value: "best-fit", label: "Best fit first", hint: "Prioritize workflow fit over software count." }
];

const taskFit = {
  Marketing: {
    canva: 10, buffer: 9, jasper: 8, chatgpt: 7, descript: 6,
    "notion-ai": 2, perplexity: 2, zapier: 1, hubspot: 1, tidio: 0, "otter-ai": 0, claude: 2, jobber: 3, quoteiq: 2, "housecall-pro": 3, companycam: 4
  },
  Sales: {
    hubspot: 10, chatgpt: 8, zapier: 7, claude: 5, "otter-ai": 5,
    notion_ai: 3, canva: 1, buffer: 0, tidio: 3, jasper: 2, descript: 0, perplexity: 3, jobber: 8, quoteiq: 7, "housecall-pro": 7, companycam: 2
  },
  "Customer Support": {
    tidio: 10, chatgpt: 7, zapier: 6, hubspot: 6, claude: 4,
    "notion-ai": 4, canva: 0, buffer: 0, jasper: 1, descript: 0, perplexity: 1, "otter-ai": 1, jobber: 8, quoteiq: 3, "housecall-pro": 8, companycam: 2
  },
  Automation: {
    zapier: 10, chatgpt: 7, "notion-ai": 6, hubspot: 5, claude: 4,
    tidio: 4, canva: 1, buffer: 2, jasper: 2, descript: 1, perplexity: 1, "otter-ai": 1, jobber: 8, quoteiq: 8, "housecall-pro": 8, companycam: 6
  },
  Content: {
    canva: 10, jasper: 9, descript: 9, chatgpt: 8, buffer: 7, claude: 7,
    "notion-ai": 4, perplexity: 4, zapier: 1, hubspot: 1, tidio: 0, "otter-ai": 3, jobber: 2, quoteiq: 2, "housecall-pro": 2, companycam: 6
  },
  Productivity: {
    chatgpt: 10, claude: 9, "notion-ai": 9, "otter-ai": 7, perplexity: 7, zapier: 6,
    hubspot: 3, canva: 2, buffer: 1, tidio: 1, jasper: 3, descript: 2, jobber: 8, quoteiq: 7, "housecall-pro": 8, companycam: 7
  }
};

function taskMatch(tool, task) {
  return taskFit[task]?.[tool.slug] ?? 0;
}

function reasonFor(tool, business, task, budget) {
  const taskText = {
    Marketing: "marketing",
    Sales: "sales follow-up",
    "Customer Support": "customer support",
    Automation: "automation",
    Content: "content creation",
    Productivity: "daily productivity"
  }[task] || "daily work";

  const budgetText = {
    lean: "Good starting value with less tool overlap.",
    balanced: "A practical fit for a focused small-business stack.",
    "best-fit": "Strong workflow fit is prioritized over feature count."
  }[budget];

  return `${tool.name} is a strong ${taskText} match for ${business}. ${budgetText}`;
}

export default function ToolFinder() {
  const [business, setBusiness] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!business || !task || !budget) return [];

    return tools
      .map(tool => {
        let rank = tool.score;
        // Task fit is deliberately the strongest signal. Business type is a useful
        // tie-breaker, but should not push a support tool into a marketing shortlist.
        rank += taskMatch(tool, task) * 2;
        if (tool.professions.includes(business)) rank += 3;
        if (business === "Contractors" && ["jobber","quoteiq","housecall-pro","companycam"].includes(tool.slug)) rank += 4;

        if (budget === "lean") {
          if (["Productivity", "Marketing"].includes(tool.category)) rank += 1;
          if (["Sales", "Customer Support"].includes(tool.category)) rank -= 0.25;
        }
        if (budget === "best-fit" && taskMatch(tool, task) >= 3) rank += 1;

        return { ...tool, rank };
      })
      .sort((a,b) => b.rank - a.rank)
      .slice(0,3);
  }, [business, task, budget]);

  const ready = business && task && budget;

  function submit(e) {
    e.preventDefault();
    if (ready) {
      setShowResults(true);
      track("finder_completed", { business, task, budget, results: results.map(x=>x.slug) });
    }
  }

  function reset() {
    setBusiness("");
    setTask("");
    setBudget("");
    setShowResults(false);
  }

  return (
    <div className="finder-card" id="finder">
      <div className="finder-head">
        <span className="panel-label">FREE AI TOOL FINDER</span>
        <strong>Get 3 practical matches</strong>
        <p>Choose your business, main task and buying approach. No signup required.</p>
      </div>

      <form onSubmit={submit} className="finder-form">
        <label>
          <span>1. Your business</span>
          <select value={business} onChange={e => { setBusiness(e.target.value); setShowResults(false); }}>
            <option value="">Choose business type</option>
            {businessOptions.map(x => <option key={x}>{x}</option>)}
          </select>
        </label>

        <label>
          <span>2. Main task</span>
          <select value={task} onChange={e => { setTask(e.target.value); setShowResults(false); }}>
            <option value="">What do you need help with?</option>
            {taskOptions.map(x => <option key={x.label}>{x.label}</option>)}
          </select>
        </label>

        <fieldset>
          <legend>3. Buying approach</legend>
          <div className="budget-options">
            {budgetOptions.map(x => (
              <label className={`budget-choice ${budget === x.value ? "selected" : ""}`} key={x.value}>
                <input
                  type="radio"
                  name="budget"
                  value={x.value}
                  checked={budget === x.value}
                  onChange={e => { setBudget(e.target.value); setShowResults(false); }}
                />
                <span><b>{x.label}</b><small>{x.hint}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <button className="primary big finder-submit" disabled={!ready}>
          Find my 3 tools →
        </button>
      </form>

      {showResults && (
        <div className="finder-results" aria-live="polite">
          <div className="finder-result-title">
            <div>
              <span className="eyebrow">YOUR MATCHES</span>
              <h3>Best starting options for {business}</h3>
            </div>
            <button type="button" className="text-button" onClick={reset}>Start again</button>
          </div>

          <div className="finder-result-list">
            {results.map((tool, index) => (
              <article className={`finder-result ${index === 0 ? "finder-result-top" : ""}`} key={tool.slug}>
                <div className="finder-rank">{index + 1}</div>
                <div className="finder-result-copy">
                  <div className="finder-result-name">
                    <strong>{tool.name} {index === 0 && <small className="top-pick">Top pick</small>}</strong>
                    <span>★ {tool.score}</span>
                  </div>
                  <p>{reasonFor(tool, business, task, budget)}</p>
                  <div className="finder-tags">
                    <span>Why it fits: {tool.category}</span>
                    <span>Best for: {tool.best}</span>
                  </div>
                </div>
                <Link className="secondary finder-review" href={`/tools/${tool.slug}`} onClick={()=>track("review_clicked",{source:"finder",tool:tool.slug,business,task})}>See review →</Link>
              </article>
            ))}
          </div>

          <p className="finder-note">
            Rankings are editorial matches based on business type, task and tool fit. Always verify current pricing and features before buying.
          </p>
          <a className="primary center finder-all" href="#explore">See all tools & filters ↓</a>
        </div>
      )}
    </div>
  );
}
