"use client";

import { motion, AnimatePresence } from "motion/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
