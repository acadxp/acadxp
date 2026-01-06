import React from "react";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Image from "next/image";

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

  const features = [
    { title: "Project Tracking", link: "#" },
    { title: "Skill Progression", link: "#" },
    { title: "Achievement System", link: "#" },
    { title: "Community Challenges", link: "#" },
  ];

  const resources = [
    { title: "Learning Paths", link: "#" },
    { title: "Code Reviews", link: "#" },
    { title: "Mentorship", link: "#" },
    { title: "Documentation", link: "#" },
  ];

  const supportLinks = [
    { title: "Help Center", link: "#" },
    { title: "Bug Reports", link: "#" },
    { title: "Feature Requests", link: "#" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600" />

      <div className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/img/acadxp-logo.png"
                  alt="AcadXP main logo"
                  width={45}
                  height={45}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-black">AcadXP</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Turn your degree into a game.
              </p>

              {/* Social links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 hover:border-violet-500/60 rounded-lg flex items-center justify-center text-violet-400 hover:text-violet-300 transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-violet-400">
                Features
              </h4>
              <nav className="space-y-3">
                {features.map((feature) => (
                  <a
                    key={feature.title}
                    href={feature.link}
                    className="block text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex items-center gap-2">
                      {feature.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Resources Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-violet-400">
                Resources
              </h4>
              <nav className="space-y-3">
                {resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.link}
                    className="block text-zinc-400 hover:text-white transition-colors text-sm group"
                  >
                    <span className="flex items-center gap-2">
                      {resource.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-violet-400">
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
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm text-center sm:text-left">
              {new Date().getFullYear()} DripCode Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
