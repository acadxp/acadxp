import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

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
    <footer className=" text-white ">
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <nav className="space-y-2">
              {features.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.link}
                  className="block text-purple-100 hover:text-white transition-colors text-sm"
                >
                  {feature.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href="#"
                  className="block text-purple-100 hover:text-white transition-colors text-sm"
                >
                  {resource.title}
                </a>
              ))}
            </nav>
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
