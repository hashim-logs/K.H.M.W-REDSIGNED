"use client";

import { FormEvent, useEffect, useState } from "react";

type ContactPolicy = {
  enabled: boolean;
  retentionDays?: number;
};

export function ContactForm() {
  const [policy, setPolicy] = useState<ContactPolicy | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/public/contact-policy")
      .then(async (response) => {
        if (!response.ok) throw new Error("Contact submission settings could not be loaded.");
        setPolicy(await response.json());
      })
      .catch(() => setPolicy({ enabled: false }));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setPending(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("subject"),
          message: form.get("message"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Your enquiry could not be stored.");
      setMessage(result.message);
      formElement.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your enquiry could not be stored.");
    } finally {
      setPending(false);
    }
  }

  if (!policy) return <p role="status">Loading enquiry settings…</p>;
  if (!policy.enabled || !policy.retentionDays) {
    return (
      <p className="source-note" role="status">
        Online enquiries are not enabled because an approved data-retention setting has not been configured. No information is collected here.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        Name
        <input autoComplete="name" name="name" required maxLength={120} />
      </label>
      <label>
        Email
        <input autoComplete="email" name="email" required type="email" maxLength={254} />
      </label>
      <label>
        Phone (optional)
        <input autoComplete="tel" name="phone" type="tel" maxLength={32} />
      </label>
      <label>
        Subject
        <input name="subject" required minLength={3} maxLength={160} />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} />
      </label>
      <label className="contact-form__trap" aria-hidden="true">
        Leave this field empty
        <input autoComplete="off" name="website" tabIndex={-1} />
      </label>
      <label className="contact-form__consent">
        <input name="consent" required type="checkbox" />
        <span>
          I agree that my name, contact details and message will be stored for staff review for up to {policy.retentionDays} days. No email will be sent.
        </span>
      </label>
      {error ? <p className="admin-message admin-message--error" role="alert">{error}</p> : null}
      {message ? <p className="admin-message admin-message--success" role="status">{message}</p> : null}
      <button className="button button--primary" disabled={pending} type="submit">
        {pending ? "Submitting…" : "Submit enquiry"}
      </button>
    </form>
  );
}
