export const metadata = { title:"Submit an AI tool" };

export default function Submit() {
  return (
    <main className="detail-page">
      <section className="business-hero">
        <span className="eyebrow">FOR SOFTWARE COMPANIES</span>
        <h1>Submit an AI tool for editorial review</h1>
        <p>Submission does not guarantee inclusion or a positive review. Sponsored placements must be clearly labelled.</p>
      </section>
      <section className="form-card">
        <label>Tool name<input placeholder="Example AI" /></label>
        <label>Website<input placeholder="https://..." /></label>
        <label>Who is it for?<input placeholder="Small retailers, agencies..." /></label>
        <label>What problem does it solve?<textarea rows="5" placeholder="Describe the business problem..." /></label>
        <button className="primary">Submit (prototype only)</button>
        <small>This prototype does not send data yet. Connect a form backend before launch.</small>
      </section>
    </main>
  );
}
