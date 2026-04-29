"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "vipin.m2@gmail.com",
    href: "mailto:vipin.m2@gmail.com",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9633 49 1984",
    href: "tel:+919633491984",
    gradient: "from-indigo-500 to-blue-600",
  },
  { icon: LinkedInIcon, label: "LinkedIn", value: "vipin-vijayakumar", href: "https://linkedin.com/in/vipin-vijayakumar", gradient: "from-blue-500 to-cyan-600" },
  {
    icon: MapPin,
    label: "Location",
    value: "Kerala, India",
    href: "#",
    gradient: "from-rose-500 to-pink-600",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you have a project in mind or just want to chat, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Ready to build something great?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
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
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                        link.gradient
                      )}
                    >
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
          </div>

          {/* Right: Contact form */}
          <div className="rounded-2xl bg-card border border-border p-8 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! I'll get back to you soon.");
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={cn(
                      "w-full h-11 px-4 rounded-xl bg-secondary border border-border",
                      "text-foreground placeholder:text-muted-foreground text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                      "transition-all duration-200"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={cn(
                      "w-full h-11 px-4 rounded-xl bg-secondary border border-border",
                      "text-foreground placeholder:text-muted-foreground text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                      "transition-all duration-200"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="Project Inquiry"
                  className={cn(
                    "w-full h-11 px-4 rounded-xl bg-secondary border border-border",
                    "text-foreground placeholder:text-muted-foreground text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-secondary border border-border",
                    "text-foreground placeholder:text-muted-foreground text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    "transition-all duration-200 resize-none"
                  )}
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl gradient-bg text-white font-medium shadow-lg hover:opacity-90 hover:scale-[1.01] transition-all duration-200"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
