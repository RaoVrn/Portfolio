import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "opening" | "handoff";

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
const DESTINATION = "prakash.varun.0305@gmail.com";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Please enter a subject.";
  if (!v.message.trim()) e.message = "Please add a message.";
  return e;
}

/**
 * Builds the mailto compose URL. Every part is URL-encoded so spaces,
 * line breaks, @ symbols, & and special characters survive intact.
 */
export function buildContactMailto(v: Values): string {
  const subject = encodeURIComponent(v.subject.trim());
  const body = encodeURIComponent(
    `Name: ${v.name.trim()}\n` +
      `Email: ${v.email.trim()}\n` +
      `Company / Organization: ${v.company.trim() || "Not provided"}\n\n` +
      `Message:\n${v.message.trim()}`
  );
  return `mailto:${DESTINATION}?subject=${subject}&body=${body}`;
}

export function ContactForm({ onDone }: { onDone: () => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "opening") return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("opening");
    window.location.href = buildContactMailto(values);
    setStatus("handoff");
  };

  if (status === "handoff") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Opening your email app</p>
        <p className={styles.successCopy}>
          Your message is ready to send from your mail client. If nothing
          opened, email me directly at {DESTINATION}.
        </p>
        <button type="button" className={styles.submit} onClick={onDone}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <p className={styles.kicker}>Contact / message</p>
      <h2 className={styles.title} id="contact-modal-title">
        Start a conversation
      </h2>
      <p className={styles.intro}>Have something in mind? Send me a message.</p>

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
          placeholder="Where do you work?"
          error={errors.company}
        />
        <Field
          id="contact-subject"
          label="Subject"
          required
          value={values.subject}
          onChange={set("subject")}
          placeholder="What would you like to discuss?"
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
        placeholder="Tell me a little about what you have in mind..."
        error={errors.message}
      />

      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={status === "opening"}>
          {status === "opening" ? "Opening email..." : "Send message"}
          {status !== "opening" && <span aria-hidden="true">→</span>}
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