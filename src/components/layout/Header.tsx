import React from "react";

function Header() {
  return (
    <header className="bg-transparent border-b border-white/10 ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl">🏆</span>
            <span className="ml-2 text-xl font-bold">Academic XP Tracker</span>
          </div>
          <nav></nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
