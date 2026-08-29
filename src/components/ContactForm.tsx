import { useState, type ChangeEvent, type FormEvent } from "react";
import { contactMailto } from "../data/site";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "success" | "error";

interface Values {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", company: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Please enter a subject.";
  if (!v.message.trim()) e.message = "Please add a message.";
  return e;
}

export function ContactForm({ onDone }: { onDone: () => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (field: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setServerError(data?.message ? data.message : "Unable to send message");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Unable to reach the server. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Message sent</p>
        <p className={styles.successCopy}>
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button type="button" className={styles.submit} onClick={onDone} data-magnetic>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <h2 className={styles.title} id="contact-modal-title">
        Let's start a conversation.
      </h2>
      <p className={styles.intro}>
        Tell me a little about what you're working on, and I'll get back to you.
      </p>

      {status === "error" && (
        <p className={styles.errorBox} role="alert">
          {serverError || "Something went wrong. Please try again."} Or{" "}
          <a href={contactMailto}>email me directly</a>.
        </p>
      )}

      <div className={styles.grid}>
        <Field
          id="contact-name"
          label="Name"
          required
          value={values.name}
          onChange={set("name")}
          placeholder="Your name"
          error={errors.name}
        />
        <Field
          id="contact-email"
          label="Email"
          required
          type="email"
          value={values.email}
          onChange={set("email")}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Field
          id="contact-company"
          label="Company / Organization"
          optional
          value={values.company}
          onChange={set("company")}
          placeholder="Optional"
          error={errors.company}
        />
        <Field
          id="contact-subject"
          label="Subject"
          required
          value={values.subject}
          onChange={set("subject")}
          placeholder="What would you like to talk about?"
          error={errors.subject}
        />
      </div>

      <Field
        id="contact-message"
        label="Message"
        required
        textarea
        value={values.message}
        onChange={set("message")}
        placeholder="Tell me about your idea, opportunity, project, or anything you'd like to discuss..."
        error={errors.message}
      />

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === "sending"}
          data-magnetic
        >
          {status === "sending" ? "Sending..." : "Send message"}
          {status !== "sending" && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
}

function Field({ id, label, required, optional, type = "text", textarea, value, onChange, placeholder, error }: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
        {optional && <span className={styles.optional}>(optional)</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
      {error && (
        <p className={styles.errorText} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}