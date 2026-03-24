"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { logoutUser } from "@/lib/api";
import { navItems } from "@/lib/utils";

const userLinks = [
  { href: "/profile", label: "Profile", icon: User },
];

interface MobileMenuProps {
  user: {
    name?: string;
    email?: string;
  } | null;
  onClose: () => void;
}

export default function MobileMenu({ user, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    onClose();
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="md:hidden border-b border-bg-tertiary bg-bg-primary absolute w-full top-16 left-0 right-0 z-40 shadow-lg">
      {/* User Info */}
      <div className="px-4 py-4 border-b border-bg-tertiary flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-primary font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-text-secondary">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="px-2 py-3 space-y-1">
        {navItems.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              isActive(link.href)
                ? "text-primary font-bold"
                : "text-text-secondary font-medium hover:text-primary hover:font-bold"
            }`}
          >
            <link.icon className={`w-5 h-5 transition-colors ${isActive(link.href) ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User Links */}
      <div className="px-2 py-3 border-t border-bg-tertiary space-y-1">
        {userLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              isActive(link.href)
                ? "text-primary font-bold"
                : "text-text-secondary font-medium hover:text-primary hover:font-bold"
            }`}
          >
            <link.icon className={`w-5 h-5 transition-colors ${isActive(link.href) ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`} />
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:text-red-600 hover:font-bold w-full transition-all"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Log out
        </button>
      </div>
    </div>
  );
}
