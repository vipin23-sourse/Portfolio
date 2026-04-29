import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── 1. Server-side IP rate limiting ─────────────────────────────────────────
//    5 submissions per IP per hour. Resets on server restart — fine for a portfolio.
const ipStore = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_PER_IP  = 5;

function checkIpLimit(ip: string): boolean {
  const now   = Date.now();
  const entry = ipStore.get(ip);
  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= MAX_PER_IP) return false;
  entry.count++;
  return true;
}

// ── 2. Disposable / throwaway email domains ──────────────────────────────────
const DISPOSABLE = new Set([
  "mailinator.com","guerrillamail.com","trashmail.com","yopmail.com",
  "10minutemail.com","tempmail.com","throwaway.email","fakeinbox.com",
  "sharklasers.com","guerrillamail.info","spam4.me","tempr.email",
  "discard.email","maildrop.cc","getairmail.com","mailnull.com",
  "spamgourmet.com","spamgourmet.net","trashmail.at","trashmail.io",
  "dispostable.com","mailexpire.com","emailondeck.com",
]);

function isDisposable(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return DISPOSABLE.has(domain);
}

// ── 3. Spam content heuristics ───────────────────────────────────────────────
const SPAM_KEYWORDS = [
  "casino","lottery","winner","prize","click here","free money",
  "buy now","make money","work from home","investment opportunity",
  "crypto","bitcoin","nft","earn \\$","backlink","seo service",
  "adult content","xxx","viagra","cialis","pharmacy","cheap meds",
];

function isSpamContent(text: string): { spam: boolean; reason: string } {
  const lower = text.toLowerCase();

  // Keyword match
  const hit = SPAM_KEYWORDS.find((kw) => lower.includes(kw));
  if (hit) return { spam: true, reason: `Spam keyword: "${hit}"` };

  // More than 3 URLs = link-farm spam
  const urls = (text.match(/https?:\/\/\S+/gi) ?? []).length;
  if (urls > 3) return { spam: true, reason: `Too many URLs (${urls})` };

  // >60 % words in ALL CAPS = shouting spam
  const words    = text.split(/\s+/).filter((w) => w.length > 3);
  const capsCount = words.filter((w) => w === w.toUpperCase() && /[A-Z]/.test(w)).length;
  if (words.length > 4 && capsCount / words.length > 0.6)
    return { spam: true, reason: "Excessive ALL CAPS" };

  return { spam: false, reason: "" };
}

// ── 4. Sanitise output HTML ──────────────────────────────────────────────────
function sanitize(str: string) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#x27;").trim();
}

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── 5. Time-based honeypot: bots fill forms in < 2 s, humans don't ──────
    const body = await req.json();
    const { name, email, subject, message, _honey, _loadedAt } = body;

    if (_honey) {
      // Bot filled the hidden field — silent ignore
      return NextResponse.json({ success: true });
    }

    if (_loadedAt && Date.now() - Number(_loadedAt) < 2500) {
      // Form submitted under 2.5 s after page load — almost certainly a bot
      return NextResponse.json({ success: true }); // silent ignore
    }

    // ── IP rate limit ────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkIpLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 }
      );
    }

    // ── Server-side field validation ─────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "Input exceeds maximum length." }, { status: 400 });
    }

    // ── Disposable email check ───────────────────────────────────────────────
    if (isDisposable(email)) {
      return NextResponse.json(
        { error: "Please use a real email address." },
        { status: 400 }
      );
    }

    // ── Spam content check ───────────────────────────────────────────────────
    const { spam, reason } = isSpamContent(`${subject} ${message}`);
    if (spam) {
      console.warn(`[contact] Spam blocked from ${ip}: ${reason}`);
      // Return 200 to not hint at detection
      return NextResponse.json({ success: true });
    }

    // ── Send via Resend ──────────────────────────────────────────────────────
    const safeName    = sanitize(name);
    const safeEmail   = sanitize(email);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message).replace(/\n/g, "<br/>");

    const { error } = await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      ["vipin.m2@gmail.com"],
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;
                    background:#0d1117;color:#e6edf3;border-radius:12px">
          <h2 style="color:#a855f7;margin:0 0 4px">New Portfolio Message</h2>
          <hr style="border:1px solid #30363d;margin-bottom:24px"/>
          <p style="margin:0 0 8px"><strong>From:</strong> ${safeName}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong>
            <a href="mailto:${safeEmail}" style="color:#a855f7">${safeEmail}</a></p>
          <p style="margin:0 0 24px"><strong>Subject:</strong> ${safeSubject}</p>
          <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;
                      padding:20px;line-height:1.7">${safeMessage}</div>
          <p style="color:#6e7681;font-size:12px;margin-top:32px">
            Sent from vipinmv.dev · IP: ${ip}
          </p>
        </div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
