"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Newsletter signup is ready for an email provider connection.");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input required placeholder="you@business.com" type="email" aria-label="Email address" />
        <button className="primary" type="submit">Join free →</button>
      </form>
      {message && <small className="form-status" role="status">{message}</small>}
    </div>
  );
}
