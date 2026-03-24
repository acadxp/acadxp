"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/utils";
import { HelpCircle, LogOut, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-bg-secondary flex-col py-8 px-6 z-50 border-r border-bg-tertiary">
      <div className="mb-10 px-2">
        <div className="flex flex-col items-center gap-3">
                  <div className="flex justify-center">
                    <Image
                      src="/assets/img/acadxp-logo.png"
                      alt="AcadXP Logo"
                      width={80}
                      height={80}
                      className="rounded-2xl"
                    />
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
                  ? "text-primary font-bold"
                  : "text-text-secondary font-medium hover:text-primary hover:font-bold",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-text-muted group-hover:text-primary",
                )}
              />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6">
        {/* Footer actions only, no notifications */}
        <Link href="/goal" className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Link>
        <div className="space-y-1 pt-6 border-t border-bg-tertiary">
          <Link
            href="/support"
            className="group flex items-center gap-3 px-4 py-2 font-medium text-text-secondary hover:text-primary hover:font-bold transition-all"
          >
            <HelpCircle className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
            <span className="text-sm">Support</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 cursor-pointer text-red-500 hover:text-red-600 hover:font-bold transition-all">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
