"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/img/acadxp-logo.png"
            alt="AcadXP"
            width={40}
            height={40}
          />
          <span className="text-white press-start-2p-regular">AcadXP</span>
        </Link>

        {/* Center: Nav links inside pill */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-200 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <li>
              <a href="#home" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
          </ul>
        </nav>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/start"
            className="rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 px-4 py-2 text-sm text-white shadow-[0_10px_30px_rgba(168,85,247,0.35)] hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
