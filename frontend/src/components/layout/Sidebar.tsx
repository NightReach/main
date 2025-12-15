"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">NightReach</h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>
        <Link href="/dashboard/websites" className="block hover:text-blue-400">
          Websites
        </Link>
        <Link href="/dashboard/campaigns" className="block hover:text-blue-400">
          Campaigns
        </Link>
        <Link href="/dashboard/stats" className="block hover:text-blue-400">
          Stats
        </Link>
      </nav>
    </aside>
  );
}
