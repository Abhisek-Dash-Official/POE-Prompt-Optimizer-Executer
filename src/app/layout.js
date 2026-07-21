import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "POE — Prompt Optimizer & Executer",
    template: "%s | POE",
  },
  description:
    "Transform raw, unstructured thoughts into expert-level AI prompts and execute them instantly. Get optimal AI results with real-time streaming.",
  keywords: [
    "Prompt Optimizer",
    "Prompt Engineering",
    "AI Prompt Generator",
    "LLM Executor",
  ],
  authors: [{ name: "Abhisek Dash" }],
  creator: "Abhisek Dash",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "POE — Prompt Optimizer & Executer",
    description:
      "Stop giving generic inputs to AI. POE optimizes your raw inputs into structured prompts and executes them for high-quality results.",
    siteName: "POE",
    images: [
      {
        url: "/readme-cover.png",
        width: 1200,
        height: 630,
        alt: "POE — Prompt Optimizer & Executer Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POE — Prompt Optimizer & Executer",
    description:
      "Transform brute-force input into high-performing AI prompts and instant results.",
    images: ["/readme-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
