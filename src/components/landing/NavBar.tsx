"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="nav-blur fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/assets/img/acadxp-logo.png"
            alt="AcadXP"
            width={36}
            height={36}
          />
          <span className="text-white press-start-2p-regular text-lg hidden sm:inline">
            AcadXP
          </span>
        </Link>

        {/* Center: Nav links - Hidden on mobile */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 press-start-2p-regular text-sm text-zinc-300">
            <li>
              <a
                href="#home"
                className="nav-link hover:text-white transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link hover:text-white transition duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="nav-link hover:text-white transition duration-200"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="nav-link hover:text-white transition duration-200"
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition duration-200 border border-zinc-600 rounded-lg hover:border-zinc-400"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition duration-200 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl press-start-2p-regular px-4 py-4 space-y-3">
            <a
              href="#home"
              className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-center text-zinc-300 border border-zinc-600 rounded-lg hover:border-zinc-400 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 text-sm text-center text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default NavBar;
