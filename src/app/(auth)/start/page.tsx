"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";

export default function StartPage() {
  return (
    <>
      <header className="top-12 my-5 w-full flex justify-center">
        {/* Logo  */}
        <Link href="/">
          <Image
            src="/assets/img/acadxp-logo.png"
            alt="AcadXP Logo"
            width={150}
            height={150}
            className="rounded-3xl shadow-2xl shadow-violet-500/50 pixel-render"
          />
        </Link>
      </header>
      <main className="w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-[24px] font-medium text-editorial text-text-primary">
            Choose Your Path
          </h1>
          <div className="w-12 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <Link
            href="/login"
            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-primary-bg border border-black/15 hover:bg-secondary-bg transition-all duration-300 text-left min-h-[320px]"
          >
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-tertiary-bg text-text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                <LogIn className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-editorial text-text-primary">
                  Login
                </h2>
                <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                  Welcome back, Architect
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary group-hover:text-primary transition-colors">
                Existing User
              </span>
              <ArrowRight className="w-5 h-5 text-text-secondary group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link
            href="/signup"
            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-primary transition-all duration-300 text-left min-h-[320px]"
          >
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-primary transition-colors">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-editorial text-white">
                  Sign Up
                </h2>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  Start your journey
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                New Explorer
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
        <div className="mt-20 flex flex-col items-center justify-center opacity-40">
          <div className="technical-margin text-[64px]">00</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mt-2">
            Initialize System
          </div>
          {/* Retro credits */}
          <p className="text-text-primary text-sm text-center pixel-text fixed bottom-4 left-0 right-0 z-10">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://dripcodestudio.com/"
              target="_blank"
              className="underline hover:text-violet-400 transition-colors"
            >
              DripCode Studio
            </a>
            . All rights reserved.
          </p>
        </div>
      </main>
    </>
  );
}
