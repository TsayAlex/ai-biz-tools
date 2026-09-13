export const metadata = {
  title: "Submission received"
};

export default function SubmissionThanks() {
  return (
    <main className="detail-page">
      <section className="business-hero">
        <span className="eyebrow">SUBMISSION RECEIVED</span>

        <h1>Thanks — your tool has been submitted for review.</h1>

        <p>
          We review submissions manually. Submission does not guarantee
          inclusion or a positive review.
        </p>

        <a href="/" className="primary">
          Back to AI Biz Tools
        </a>
      </section>
    </main>
  );
}
