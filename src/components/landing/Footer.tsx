import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/acadxp",
      icon: <Github size={18} />,
    },
    {
      name: "Linkedin",
      href: "#",
      icon: <Linkedin size={18} />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: <Twitter size={18} />,
    },
  ];

  const supportLinks = [
    { title: "Help Center", link: "https://github.com/acadxp/acadxp" },
    {
      title: "Bug Reports",
      link: "https://github.com/acadxp/acadxp/issues",
    },
    {
      title: "Feature Requests",
      link: "https://github.com/acadxp/acadxp/issues/new",
    },
    { title: "Documentation", link: "https://github.com/acadxp/acadxp" },
  ];

  const policiesLinks = [
    { title: "Terms of Service", link: "/terms-of-service" },
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Cookie Policy", link: "/cookie-policy" },
  ];

  return (
    <footer className="flex flex-col text-white bg-black relative">
      <div className=" px-3 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/img/acadxp-logo.png"
                alt="AcadXP main logo"
                width={50}
                height={50}
                className="rounded-xl"
              />
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              Turn your degree into a game.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <nav className="space-y-2">
              {supportLinks.map((link) => (
                <a
                  key={link.title}
                  href="#"
                  target="_blank"
                  className="block text-purple-100 hover:text-white transition-colors text-sm"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Policies  */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Policies</h4>
            <nav className="space-y-2">
              {policiesLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  target="_blank"
                  className="block text-purple-100 hover:text-white transition-colors text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-5 ">
          <p className="text-center text-purple-100 text-sm">
            © {new Date().getFullYear()} DripCode Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
