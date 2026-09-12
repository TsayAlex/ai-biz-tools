import Link from "next/link";

export default function Header() {
  return (
    <header className="nav">
      <Link className="brand" href="/"><span>AI</span> Biz Tools</Link>
      <nav aria-label="Primary navigation">
        <Link href="/#explore">Tools</Link>
        <Link href="/#business">By Business</Link>
        <Link href="/compare/chatgpt-vs-claude">Compare</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/methodology">Methodology</Link>
      </nav>
      <Link className="nav-cta" href="/#finder">Find my tools</Link>
    </header>
  );
}
