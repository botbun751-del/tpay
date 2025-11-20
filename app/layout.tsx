import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@/styles/patterns.css";
import { ThemeProvider, AuthSessionProvider, SonnerProvider } from "@/components";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tpay.local"),
  title: {
    default: "TPAY — Incentivize responsibly",
    template: "%s | TPAY",
  },
  description: "Modern referral, payouts, and compliance infrastructure built on Next.js 14.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AuthSessionProvider>
          <ThemeProvider>
            <div className="relative min-h-screen bg-background text-foreground">
              <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40 dark:opacity-20" />
              <main className="relative z-10">{children}</main>
            </div>
            <SonnerProvider />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
