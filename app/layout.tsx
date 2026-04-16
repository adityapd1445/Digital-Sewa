import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Digital Sewa",
  description: "A community support app for help requests and donations.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/request-help", label: "Request Help" },
  { href: "/view-requests", label: "View Requests" },
  { href: "/donate", label: "Donate" },
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
  { href: "/admin", label: "Admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
            <div>
              <Link href="/" className="text-xl font-semibold text-slate-900">
                Digital Sewa
              </Link>
              <p className="text-sm text-slate-500">Community help requests and donations.</p>
            </div>
            <nav className="flex flex-wrap items-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white/90 py-4 text-center text-sm text-slate-500">
          Built with Next.js, Tailwind CSS, and MongoDB.
        </footer>
      </body>
    </html>
  );
}
