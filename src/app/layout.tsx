import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

/* ── Fonts — next/font eliminates render-blocking Google Fonts requests ── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false,
  weight: ["400", "500", "600"],
});

/* ── Viewport ─────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d1117" },
  ],
};

/* ── Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://vipinmv.dev"),
  title: "Vipin MV | UI / Frontend Developer",
  description:
    "UI / Frontend Developer with 6+ years of experience. Expert in React.js, Next.js, and AI-enhanced web development. Available for international projects.",
  keywords: [
    "Vipin MV", "Frontend Developer", "React.js", "Next.js",
    "UI Developer", "UI Architect", "Kerala", "India", "Webandcrafts",
  ],
  authors: [{ name: "Vipin MV", url: "https://vipinmv.dev" }],
  creator: "Vipin MV",
  openGraph: {
    title: "Vipin MV | UI / Frontend Developer",
    description:
      "UI / Frontend Developer with 6+ years of experience delivering pixel-perfect, high-performance web applications.",
    type: "website",
    url: "https://vipinmv.dev",
    siteName: "Vipin MV Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipin MV | UI / Frontend Developer",
    description: "UI / Frontend Developer — React.js, Next.js, AI workflows.",
    creator: "@vipinmv",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://vipinmv.dev" },
  icons: {
    icon:    [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple:   [{ url: "/favicon.svg" }],
    shortcut:[{ url: "/favicon.svg" }],
  },
};

/* ── JSON-LD structured data ──────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vipin MV",
  jobTitle: "UI Architect / Frontend Developer",
  url: "https://vipinmv.dev",
  email: "vipin.m2@gmail.com",
  telephone: "+919633491984",
  address: { "@type": "PostalAddress", addressLocality: "Kerala", addressCountry: "IN" },
  sameAs: ["https://linkedin.com/in/vipin-vijayakumar"],
  knowsAbout: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "AI workflows", "UI/UX"],
  worksFor: { "@type": "Organization", name: "Webandcrafts" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
