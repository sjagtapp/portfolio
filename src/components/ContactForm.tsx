"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "phone" | "service" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

const LIMITS = { name: 80, phone: 20, message: 2000 };
const SERVICE_OPTIONS = [...services.map((s) => s.title), "Something else / not sure"];

/** Client-side validation. The API route validates again on the server. */
function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  else if (v.name.length > LIMITS.name) e.name = `Keep it under ${LIMITS.name} characters.`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !/^[+\d][\d\s-]{6,18}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.service) e.service = "Please choose an option.";
  if (v.message.trim().length < 10) e.message = "Tell me a little more (at least 10 characters).";
  else if (v.message.length > LIMITS.message) e.message = `Keep it under ${LIMITS.message} characters.`;
  return e;
}

/** The enquiry as plain text — used for the WhatsApp and email fallbacks. */
function summary(v: Values) {
  return [
    `Hi ${site.name.split(" ")[0]}, I'd like to talk about a project.`,
    ``,
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    v.phone.trim() ? `Phone: ${v.phone.trim()}` : null,
    `Looking for: ${v.service}`,
    ``,
    v.message.trim(),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/**
 * Enquiry form. Posts to /api/contact; until email delivery is set up there
 * (see route.ts), it hands the finished message to WhatsApp or the visitor's
 * email app instead, so no enquiry is ever lost.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (touched[f]) setErrors(validate(next));
  };
  const blur = (f: Field) => () => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) {
      (document.getElementById(`contact-${first}`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject: `${values.service} — enquiry from ${values.name.trim()}` }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reason?: string };
      if (res.ok && json.ok) setStatus("sent");
      else if (res.status === 501 || json.reason === "not-configured") setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const text = summary(values);
  const whatsappHref = whatsappUrl.replace(/text=.*$/, `text=${encodeURIComponent(text)}`);
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(`${values.service || "Website"} enquiry`)}&body=${encodeURIComponent(text)}`;

  if (status === "sent") {
    return (
      <div role="status" className="mt-6 rounded-xl border border-success/40 bg-success/10 p-8 text-center">
        <CheckCircle2 size={28} className="mx-auto text-success" aria-hidden="true" />
        <p className="mt-4 text-xl font-bold tracking-tight">Message sent</p>
        <p className="mt-2 text-ink-muted">Thanks, {values.name.trim().split(" ")[0]}. I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div role="status" className="mt-6 rounded-xl border border-line bg-bg/70 p-6">
        <p className="text-lg font-bold tracking-tight">Your message is ready</p>
        <p className="mt-1.5 text-ink-muted">Choose how you&apos;d like to send it. Everything you wrote is already filled in.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href={whatsappHref}>
            <WhatsappIcon size={17} /> Send on WhatsApp
          </Button>
          <Button href={mailHref} variant="secondary">
            <Mail size={17} aria-hidden="true" /> Send by email
          </Button>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-ink">
          Edit my message
        </button>
      </div>
    );
  }

  const label = (f: Field, text: string, optional = false) => (
    <label htmlFor={`contact-${f}`} className="mb-1.5 block text-sm font-semibold">
      {text} {optional ? <span className="font-normal text-ink-subtle">(optional)</span> : null}
    </label>
  );
  const error = (f: Field) =>
    touched[f] && errors[f] ? (
      <p id={`contact-${f}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-red-400">
        <AlertCircle size={13} aria-hidden="true" /> {errors[f]}
      </p>
    ) : null;
  const control = (f: Field) =>
    cn(
      "w-full rounded-lg border bg-bg/70 px-3.5 py-2.5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200",
      "placeholder:text-ink-subtle hover:border-white/25 focus:border-accent focus:ring-4 focus:ring-accent/20",
      touched[f] && errors[f] ? "border-red-500/70" : "border-line-strong",
    );
  const a11y = (f: Field) => ({
    id: `contact-${f}`,
    name: f,
    "aria-invalid": Boolean(touched[f] && errors[f]),
    "aria-describedby": touched[f] && errors[f] ? `contact-${f}-error` : undefined,
    onBlur: blur(f),
    onChange: set(f),
    value: values[f],
  });

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5" aria-label="Project enquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Your name")}
          <input type="text" autoComplete="name" maxLength={LIMITS.name + 10} className={control("name")} {...a11y("name")} />
          {error("name")}
        </div>
        <div>
          {label("email", "Email")}
          <input type="email" autoComplete="email" className={control("email")} {...a11y("email")} />
          {error("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("phone", "Phone / WhatsApp", true)}
          <input type="tel" autoComplete="tel" maxLength={LIMITS.phone} className={control("phone")} {...a11y("phone")} />
          {error("phone")}
        </div>
        <div>
          {label("service", "What do you need?")}
          <select className={cn(control("service"), !values.service && "text-ink-subtle")} {...a11y("service")}>
            <option value="" disabled className="bg-surface">
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-surface text-ink">
                {s}
              </option>
            ))}
          </select>
          {error("service")}
        </div>
      </div>

      <div>
        {label("message", "Tell me about your project")}
        <textarea
          rows={5}
          maxLength={LIMITS.message + 50}
          placeholder="What does your business do, and what should the website help you with?"
          className={cn(control("message"), "min-h-[130px] resize-y")}
          {...a11y("message")}
        />
        {error("message")}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" /> Send message
            </>
          )}
        </Button>
        {status === "error" ? (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle size={14} aria-hidden="true" /> Something went wrong.{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Send on WhatsApp instead
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
