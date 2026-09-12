"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "../data/tools";

const categories = ["All", ...Array.from(new Set(tools.map(x => x.category)))];
const professions = ["All", ...Array.from(new Set(tools.flatMap(x => x.professions)))];

export default function ToolExplorer() {
  const [category, setCategory] = useState("All");
  const [profession, setProfession] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => tools.filter(tool => {
    const c = category === "All" || tool.category === category;
    const p = profession === "All" || tool.professions.includes(profession);
    const q = (tool.name+" "+tool.description+" "+tool.best).toLowerCase().includes(query.toLowerCase());
    return c && p && q;
  }), [category, profession, query]);

  return (
    <section id="explore" className="section">
      <div className="section-head">
        <div>
          <span className="eyebrow">CURATED DIRECTORY</span>
          <h2>Find tools that match the work you actually do</h2>
        </div>
        <p className="muted">Filter by business and task. Every tool now has its own review page.</p>
      </div>

      <div className="filters">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tools or tasks..." aria-label="Search tools" />
        <select value={profession} onChange={e=>setProfession(e.target.value)} aria-label="Business type">
          {professions.map(x=><option key={x}>{x}</option>)}
        </select>
        <select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Category">
          {categories.map(x=><option key={x}>{x}</option>)}
        </select>
      </div>

      <div className="results-meta">{filtered.length} tools found</div>
      <div className="grid">
        {filtered.map(tool => (
          <article className="card" key={tool.slug}>
            <div className="card-top">
              <div className="logo">{tool.name.slice(0,1)}</div>
              <div><h3>{tool.name}</h3><span className="tag">{tool.category}</span></div>
              <span className="score">★ {tool.score}</span>
            </div>
            <p>{tool.description}</p>
            <dl>
              <div><dt>Best for</dt><dd>{tool.best}</dd></div>
              <div><dt>Pricing</dt><dd>Check current</dd></div>
            </dl>
            <div className="card-actions">
              <Link className="secondary center" href={`/tools/${tool.slug}`}>Read review</Link>
              <a className="primary center" href={tool.website} target="_blank" rel="nofollow noopener">Official site ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
