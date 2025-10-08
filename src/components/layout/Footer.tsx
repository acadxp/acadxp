import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-500 via-purple-700 to-purple-600 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-bold">AcadXP</h3>
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              Turn your degree into a game.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Project Tracking
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Skill Progression
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Achievement System
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Community Challenges
              </a>
            </nav>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Learning Paths
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Code Reviews
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Mentorship
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Documentation
              </a>
            </nav>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Bug Reports
              </a>
              <a
                href="#"
                className="block text-purple-100 hover:text-white transition-colors text-sm"
              >
                Feature Requests
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-purple-100 text-sm">
            © 2024 Portfolio. All rights reserved. Keep coding, keep growing! 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
