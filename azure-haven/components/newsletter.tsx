"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus-visible:border-gold-400"
      />
      <button
        type="submit"
        className="shrink-0 rounded-sm bg-gold-500 px-6 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-gold-400"
      >
        {submitted ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}
