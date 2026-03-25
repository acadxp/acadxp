import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and manifest links */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/img/favicon_io/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/img/favicon_io/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/img/favicon_io/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/assets/img/favicon_io/android-chrome-512x512.png"
        />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {/* Navigation Bar */}
          <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-violet-500/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </div>
          </nav>

          {/* Content */}
          {children}
        </div>
      </body>
    </html>
  );
}
