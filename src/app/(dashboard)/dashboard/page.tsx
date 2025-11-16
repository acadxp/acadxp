"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard!</h1>

      <div className="max-w-2xl rounded-xl border border-purple-500/30 bg-gray-900/40 p-6 backdrop-blur">
        <p className="text-lg mb-2">Thanks for creating your account 🎉</p>
        <p className="text-sm text-purple-200/80 mb-4">
          The app is currently in production. Join the waitlist to stay updated
          on new features and rollout updates.
        </p>
        <div>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
              Join the waitlist
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
