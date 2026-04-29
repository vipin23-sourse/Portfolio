import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Vipin MV | UI / Frontend Developer",
  description:
    "UI / Frontend Developer with 6+ years of experience. Expert in React.js, Next.js, and AI-enhanced web development. Available for international projects.",
  keywords: [
    "Vipin MV",
    "Frontend Developer",
    "React.js",
    "Next.js",
    "UI Developer",
    "Kerala",
    "India",
  ],
  authors: [{ name: "Vipin MV" }],
  openGraph: {
    title: "Vipin MV | UI / Frontend Developer",
    description:
      "UI / Frontend Developer with 6+ years of experience delivering pixel-perfect, high-performance web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
