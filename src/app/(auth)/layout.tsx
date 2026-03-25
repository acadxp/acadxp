"use client";

import { motion, AnimatePresence } from "motion/react";

export default function AuthLayout({
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-secondary-bg relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 font-sans bg-bg-secondary text-text-primary antialiased">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
              style={{
                backgroundImage:
                  "radial-gradient(#4F46E5 0.5px, transparent 0.5px)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary-bg rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-20"></div>
          </div>
          {children}
        </motion.div>
      </body>
    </html>
  );
}
