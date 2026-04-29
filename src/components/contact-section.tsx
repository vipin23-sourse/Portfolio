"use client";

import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback, useEffect } from "react";

// ── Constants ────────────────────────────────────────────────────────────────
const MAX_NAME     = 80;
const MAX_SUBJECT  = 120;
const MAX_MESSAGE  = 1000;
const MIN_MESSAGE  = 20;
const RATE_LIMIT_MS = 60_000; // 1 min between submissions

// ── Sanitiser — strips HTML tags and dangerous chars ─────────────────────────
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")               // strip HTML tags
    .replace(/[<>"'`]/g, "")              // strip angle brackets / quotes
    .replace(/javascript:/gi, "")         // strip JS proto
    .replace(/on\w+\s*=/gi, "")           // strip event handlers
    .trim();
}

// ── Email format validator ────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ── Contact link data ─────────────────────────────────────────────────────────
const contactLinks = [
  { icon: Mail,         label: "Email",    value: "vipin.m2@gmail.com",    href: "mailto:vipin.m2@gmail.com",                  gradient: "from-violet-500 to-purple-600" },
  { icon: Phone,        label: "Phone",    value: "+91 9633 49 1984",       href: "tel:+919633491984",                          gradient: "from-indigo-500 to-blue-600"  },
  { icon: LinkedInIcon, label: "LinkedIn", value: "vipin-vijayakumar",      href: "https://linkedin.com/in/vipin-vijayakumar", gradient: "from-blue-500 to-cyan-600"    },
  { icon: MapPin,       label: "Location", value: "Kerala, India",          href: "#",                                          gradient: "from-rose-500 to-pink-600"    },
];

// ── Field errors type ─────────────────────────────────────────────────────────
type FieldErrors = { name?: string; email?: string; subject?: string; message?: string };
type Status = "idle" | "loading" | "success" | "error";

// ── Input class helper ────────────────────────────────────────────────────────
function inputCls(hasError?: boolean) {
  return cn(
    // Base
    "w-full px-4 rounded-xl bg-secondary border text-foreground placeholder:text-muted-foreground text-sm",
    // Smooth: only animate the properties that actually change (no jank from transition-all)
    "transition-[border-color,box-shadow,background-color] duration-300 ease-in-out",
    // Focus: border fades to purple + soft outer glow instead of a hard ring
    "focus:outline-none focus:border-primary focus:bg-accent/30",
    "focus:shadow-[0_0_0_3px_hsl(262,83%,65%,0.15),0_0_12px_hsl(262,83%,65%,0.08)]",
    // Error state
    hasError
      ? "border-destructive focus:border-destructive focus:shadow-[0_0_0_3px_hsl(0,84%,60%,0.15)]"
      : "border-border hover:border-primary/40"
  );
}

export function ContactSection() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors,  setErrors]  = useState<FieldErrors>({});
  const [status,  setStatus]  = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");

  // Rate-limit ref (stores last submit timestamp)
  const lastSubmit  = useRef<number>(0);
  const loadedAt    = useRef<number>(0);

  // Record when the form was rendered — used for bot timing check
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = useCallback((): FieldErrors => {
    const e: FieldErrors = {};
    const sName    = sanitize(name);
    const sEmail   = email.trim();
    const sSubject = sanitize(subject);
    const sMessage = sanitize(message);

    if (!sName || sName.length < 2)           e.name    = "Name must be at least 2 characters.";
    if (sName.length > MAX_NAME)              e.name    = `Name must be under ${MAX_NAME} characters.`;
    if (!sEmail || !isValidEmail(sEmail))     e.email   = "Please enter a valid email address.";
    if (!sSubject || sSubject.length < 3)     e.subject = "Subject must be at least 3 characters.";
    if (sSubject.length > MAX_SUBJECT)        e.subject = `Subject must be under ${MAX_SUBJECT} characters.`;
    if (!sMessage || sMessage.length < MIN_MESSAGE) e.message = `Message must be at least ${MIN_MESSAGE} characters.`;
    if (sMessage.length > MAX_MESSAGE)        e.message = `Message must be under ${MAX_MESSAGE} characters.`;

    return e;
  }, [name, email, subject, message]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check (hidden field must be empty)
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value;
    if (honeypot) return; // bot — silently ignore

    // Rate limit
    const now = Date.now();
    if (now - lastSubmit.current < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit.current)) / 1000);
      setStatus("error");
      setStatusMsg(`Please wait ${wait}s before sending another message.`);
      return;
    }

    // Field validation
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    lastSubmit.current = now;

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, subject, message, _honey: honeypot, _loadedAt: loadedAt.current }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setStatusMsg(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setStatusMsg("Message sent! I'll get back to you soon. 🚀");
        setName(""); setEmail(""); setSubject(""); setMessage("");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please check your connection and try again.");
    }
  };

  const msgLen = message.length;
  const msgNear = msgLen > MAX_MESSAGE * 0.85;
  const msgOver  = msgLen > MAX_MESSAGE;

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you have a project in mind or just want to chat, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">

          {/* Left: Contact info */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Ready to build something great?</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              I specialise in high-performance frontend development, UI architecture, and
              AI-enhanced workflows. Let&apos;s turn your vision into a pixel-perfect, blazing-fast reality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-xl bg-card border border-border",
                      "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
                      "transition-all duration-200"
                    )}
                  >
                    <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", link.gradient)}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">{link.label}</p>
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">
                        {link.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Security badge */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-xl px-4 py-3 bg-card">
              <Shield className="h-4 w-4 text-primary shrink-0" />
              <span>This form is protected against spam, XSS, and abuse.</span>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* ── Honeypot (hidden from real users, catches bots) ── */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="Leave this blank"
                />
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="contact-name">Name <span className="text-destructive">*</span></label>
                    <span className={cn("text-xs tabular-nums", name.length > MAX_NAME ? "text-destructive" : "text-muted-foreground")}>
                      {name.length}/{MAX_NAME}
                    </span>
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    maxLength={MAX_NAME + 1}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                    placeholder="John Doe"
                    className={cn(inputCls(!!errors.name), "h-11")}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" htmlFor="contact-email">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    maxLength={254}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                    placeholder="john@example.com"
                    className={cn(inputCls(!!errors.email), "h-11")}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-subject">Subject <span className="text-destructive">*</span></label>
                  <span className={cn("text-xs tabular-nums", subject.length > MAX_SUBJECT ? "text-destructive" : "text-muted-foreground")}>
                    {subject.length}/{MAX_SUBJECT}
                  </span>
                </div>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  maxLength={MAX_SUBJECT + 1}
                  onChange={(e) => { setSubject(e.target.value); setErrors((prev) => ({ ...prev, subject: undefined })); }}
                  placeholder="Project Inquiry"
                  className={cn(inputCls(!!errors.subject), "h-11")}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.subject}</p>}
              </div>

              {/* Message + live counter */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="contact-message">Message <span className="text-destructive">*</span></label>
                  <span className={cn(
                    "text-xs tabular-nums font-medium transition-colors duration-200",
                    msgOver  ? "text-destructive" :
                    msgNear  ? "text-amber-500 dark:text-amber-400" :
                               "text-muted-foreground"
                  )}>
                    {msgLen}/{MAX_MESSAGE}
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    maxLength={MAX_MESSAGE + 1}
                    onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: undefined })); }}
                    placeholder={`Tell me about your project... (min ${MIN_MESSAGE} characters)`}
                    className={cn(inputCls(!!errors.message || msgOver), "py-3 resize-none")}
                  />

                </div>
                {errors.message && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</p>}
                {msgOver && !errors.message && <p className="mt-1.5 text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />Message exceeds the {MAX_MESSAGE} character limit.</p>}
              </div>

              {/* Status banner */}
              {status === "success" && (
                <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {statusMsg}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {statusMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success" || msgOver}
                className={cn(
                  "w-full h-12 flex items-center justify-center gap-2 rounded-xl font-medium shadow-lg transition-all duration-200",
                  status === "loading" || status === "success" || msgOver
                    ? "gradient-bg opacity-60 cursor-not-allowed"
                    : "gradient-bg text-white hover:opacity-90 hover:scale-[1.01]"
                )}
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                ) : status === "success" ? (
                  <><CheckCircle className="h-4 w-4" /> Sent!</>
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                All fields are sanitised. Your data is never stored or sold.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
