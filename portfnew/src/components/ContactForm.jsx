import { useRef, useState } from "react";
import { Mail, LoaderCircle } from "lucide-react";

const emptyForm = { username: "", email: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const sending = useRef(false);

  function update(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    if (status !== "sending") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    if (!form.username.trim() || !form.message.trim()) {
      setStatus("error");
      setFeedback("Please enter your name and message.");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setFeedback("Sending your message…");
    try {
      const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
      const response = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true) {
        throw new Error(
          data.error ||
            "Your message could not be sent. Please try again later or use the email options above.",
        );
      }
      setStatus("success");
      setFeedback(
        "Your message has been sent. Thank you for getting in touch!",
      );
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof TypeError
          ? "Could not connect. Please check your connection and try again, or use the email options above."
          : error.message,
      );
    } finally {
      sending.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-labelledby="contact-form-title"
      aria-busy={status === "sending"}
    >
      <h3 id="contact-form-title">Or send a message right here.</h3>
      <fieldset disabled={status === "sending"}>
        <div className="contact-form-row">
          <label htmlFor="contact-name">
            Your name
            <input
              id="contact-name"
              name="username"
              value={form.username}
              onChange={update}
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label htmlFor="contact-email">
            Email address
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <div className="message-field">
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={update}
            required
            maxLength={5000}
            rows={5}
          />
        </div>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">
            Leave this field empty
            <input
              id="contact-website"
              name="website"
              value={form.website}
              onChange={update}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <button type="submit" className="button primary">
          {status === "sending" ? (
            <LoaderCircle size={18} aria-hidden="true" />
          ) : (
            <Mail size={18} aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </fieldset>
      <p
        className={`form-feedback ${status}`}
        role={status === "error" ? "alert" : "status"}
      >
        {feedback}
      </p>
    </form>
  );
}
