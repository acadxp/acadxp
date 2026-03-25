"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      <div className="bg-red-500 text-white text-xs sm:text-sm font-medium py-2 px-4 flex items-center justify-center gap-2">
        <span>
          👋 <strong>Friendly heads-up:</strong> Our backend is hosted on a free
          tier and sleeps after 15 seconds of inactivity. If things seem slow,
          it's just waking back up!
        </span>
      </div>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#f7f7f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <Link href="/#hero" className="flex items-center gap-3">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={70}
              height={50}
              className="rounded-md"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="text-[#4F46E5] font-semibold">
              Features
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[#6b6a65] hover:text-[#4F46E5] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-[#4F46E5] text-white rounded-lg text-sm font-semibold hover:bg-[#4338ca] transition-all shadow-sm active:scale-95"
            >
              Sign Up
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-[#f7f7f6] px-6 py-6 space-y-4"
          >
            <a
              href="#features"
              className="block text-sm font-medium text-[#4F46E5]"
            >
              Features
            </a>

            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/login"
                className="w-full p-3 text-center text-sm font-medium text-[#6b6a65] border border-[#f7f7f6] rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="w-full p-3 text-center bg-[#4F46E5] text-white rounded-lg text-sm font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </div>
  );
}
