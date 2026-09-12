import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <Link className="brand" href="/"><span>AI</span> Biz Tools</Link>
          <p>Practical AI software discovery for small businesses.</p>
        </div>
        <div>
          <b>Discover</b>
          <Link href="/#explore">AI Tools</Link>
          <Link href="/#business">By Business</Link>
          <Link href="/compare/chatgpt-vs-claude">Comparisons</Link>
          <Link href="/guides">Guides</Link>
        </div>
        <div>
          <b>Company</b>
          <Link href="/about">About</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/submit">Submit a tool</Link>
          <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
        </div>
        <div>
          <b>Legal</b>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>Independent selection</span>
          <span>No fake reviews</span>
        </div>
      </footer>
      <div className="disclosure">
        Some links may become affiliate links. Commercial relationships do not determine editorial rankings. Verify vendor pricing and features before purchase.
      </div>
    </>
  );
}
