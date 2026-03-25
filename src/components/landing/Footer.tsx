import React from "react";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/acadxp",
      icon: <Github size={20} />,
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/company/acadxp/",
      icon: <Linkedin size={20} />,
    },
    {
      name: "Twitter",
      href: "https://x.com/acadxp",
      icon: <Twitter size={20} />,
    },
  ];

  const supportLinks = [
    { title: "Help Center", link: "https://github.com/acadxp/acadxp" },
    { title: "Bug Reports", link: "https://github.com/acadxp/acadxp/issues" },
    {
      title: "Feature Requests",
      link: "https://github.com/acadxp/acadxp/issues/new",
    },
    { title: "Documentation", link: "https://github.com/acadxp/acadxp" },
  ];

  const navLinks = [{ title: "Features", link: "/#features" }];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-violet-600 via-[#4F46E5] to-violet-600" />

      <div className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-5">
            {/* Brand column */}
            <div className="max-w-sm space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/img/acaxp-icon-transparent.png"
                  alt="AcadXP Logo"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-black">AcadXP</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Transform your academic journey into an epic adventure. Level up
                your learning today.
              </p>

              {/* Social links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#4F46E5]/20 hover:bg-[#4F46E5]/40 border border-[#4F46E5]/30 hover:border-[#4F46E5]/60 rounded-lg flex items-center justify-center text-[#4F46E5] hover:text-violet-300 transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">
                Platform
              </h4>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.link}
                    className="block text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Support column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">
                Support
              </h4>
              <nav className="space-y-3">
                {supportLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter column */}
            {/* <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#4F46E5]">
                Stay Updated
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Get the latest features and updates delivered to your inbox.
              </p>
              <form className="flex flex-col gap-3 pt-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-[#4F46E5]/30 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#4F46E5]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-[#4F46E5] cursor-pointer rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-[#4F46E5]/50 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div> */}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} AcadXP. All rights reserved.
            </p>
            <p className="text-zinc-500 text-sm">
              Made with <span className="text-red-600">♥</span> by{" "}
              <a
                href="https://dripcodestudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4F46E5] hover:text-[#4F46E5] transition-colors font-medium"
              >
                DripCode Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
