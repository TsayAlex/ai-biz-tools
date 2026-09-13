export const metadata = {
  title: "Submit an AI tool"
};

export default function Submit() {
  return (
    <main className="detail-page">
      <section className="business-hero">
        <span className="eyebrow">FOR SOFTWARE COMPANIES</span>

        <h1>Submit an AI tool for editorial review</h1>

        <p>
          Submission does not guarantee inclusion or a positive review.
          Sponsored placements must be clearly labelled.
        </p>
      </section>

      <section className="form-card">
        <form action="/api/submit" method="POST">
          <label>
            Tool name
            <input
              name="toolName"
              placeholder="Example AI"
              required
              maxLength={100}
            />
          </label>

          <label>
            Website
            <input
              name="website"
              type="url"
              placeholder="https://..."
              required
              maxLength={300}
            />
          </label>

          <label>
            Who is it for?
            <input
              name="audience"
              placeholder="Small retailers, agencies..."
              required
              maxLength={200}
            />
          </label>

          <label>
            What problem does it solve?
            <textarea
              name="problem"
              rows="5"
              placeholder="Describe the business problem..."
              required
              maxLength={2000}
            />
          </label>

          {/* Honeypot anti-spam field */}
          <input
            type="text"
            name="companyWebsite"
            tabIndex="-1"
            autoComplete="off"
            style={{ display: "none" }}
          />

          <button className="primary" type="submit">
            Submit tool
          </button>

          <small>
            Submissions are reviewed manually. Submission does not guarantee
            inclusion in AI Biz Tools.
          </small>
        </form>
      </section>
    </main>
  );
}