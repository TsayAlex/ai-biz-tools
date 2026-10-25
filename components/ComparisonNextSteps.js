"use client";

import Link from "next/link";
import { track } from "../lib/analytics";

export default function ComparisonNextSteps({ comparison }) {
  function clicked(destination) {
    track("comparison_cta_clicked", { comparison, destination, placement: "comparison_next_steps" });
  }
  return <section className="cta-panel" aria-label="Next steps after comparing">
    <div><span className="eyebrow">NEXT STEP</span><h2>Find a tool, then learn how to use it.</h2>
      <p>Browse the reviewed catalogue or continue learning in ALEX AI Growth Academy.</p></div>
    <div className="hero-actions">
      <Link className="primary big" href="/#explore" onClick={() => clicked("catalogue")}>Browse the catalogue →</Link>
      <a className="secondary big" target="_blank" rel="noopener noreferrer" href={`https://grand-florentine-193409.netlify.app/?utm_source=ai_biz_tools&utm_medium=referral&utm_campaign=comparison_next_steps&utm_content=${encodeURIComponent(comparison)}`} onClick={() => clicked("academy")}>Open Academy ↗</a>
    </div>
  </section>;
}
