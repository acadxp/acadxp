"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/utils";
import { HelpCircle, LogOut, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-[#f7f7f6] flex-col py-8 px-6 z-50 border-r border-[#f0efec]">
      <div className="mb-10 px-2">
        <span className="text-2xl font-black tracking-tighter text-[#4F46E5] block">
          AcadXP
        </span>
        <div className="mt-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            AT
          </div>
          <div>
            <p className="text-sm font-bold text-[#111110]">Alex Tremblay</p>
            <p className="text-[10px] uppercase tracking-widest text-[#a8a7a2] font-black">
              Level 42 Architect
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-white text-[#4F46E5] font-bold shadow-sm"
                  : "text-[#6b6a65] hover:text-[#111110] hover:bg-[#f0efec]",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive
                    ? "text-[#4F46E5]"
                    : "text-[#a8a7a2] group-hover:text-[#6b6a65]",
                )}
              />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        <button className="w-full py-3 bg-[#4F46E5] text-white rounded-xl text-sm font-bold hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          New Challenge
        </button>

        <div className="space-y-1 pt-6 border-t border-[#f0efec]">
          <Link
            href="/support"
            className="flex items-center gap-3 px-4 py-2 text-[#6b6a65] hover:text-[#111110] transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-[#a8a7a2]" />
            <span className="text-sm">Support</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-[#6b6a65] hover:text-[#111110] transition-colors">
            <LogOut className="w-5 h-5 text-[#a8a7a2]" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
