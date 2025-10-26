import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header>
      <div className="bg-transparent border-b border-white/10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/img/acadxp-logo.png"
            alt="AcadXP main logo"
            width={80}
            height={80}
            className="rounded-2xl"
          />
        </div>
        <nav></nav>
      </div>
    </header>
  );
}

export default Header;
