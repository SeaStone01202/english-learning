import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "English Learning App",
  description: "Learn English with interactive exercises",
};

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
      <body className="min-h-screen flex flex-col">
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-brand">
              📚 English Learning
            </Link>
            <div className="nav-links">
              <Link href="/practice" className="nav-link">
                Practice
              </Link>
              <Link href="/history" className="nav-link">
                History
              </Link>
              <Link href="/settings" className="nav-link">
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <main className="main-content">{children}</main>
        <footer className="footer">
          <p>&copy; 2026 English Learning App. Keep practicing!</p>
        </footer>
      </body>
    </html>
  );
}
