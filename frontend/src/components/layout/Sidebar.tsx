"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { decodeJwt } from "@/lib/jwt";

type Role = "ADMIN" | "ADVERTISER" | "PUBLISHER";

export default function Sidebar() {
  const [role, setRole] = useState<Role | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = decodeJwt(token);
      setRole(decoded.role as Role);
    } catch {
      setRole(null);
    }
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) {
    return (
      <aside className="w-64 bg-zinc-900 text-white p-4" />
    );
  }

  return (
    <aside className="w-64 bg-zinc-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">NightReach</h2>

      {/* COMMON */}
      <nav className="flex flex-col gap-2 text-sm">
        <Link
          href="/dashboard"
          className="block rounded px-2 py-1 hover:bg-zinc-800"
        >
          Dashboard
        </Link>
      </nav>

      {/* PUBLISHER */}
      {role === "PUBLISHER" && (
        <>
          <div className="mt-6 text-xs text-gray-400 uppercase">
            Publisher
          </div>
          <nav className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/publisher/websites">
              Websites
            </Link>
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/publisher/stats">
              Stats
            </Link>
          </nav>
        </>
      )}

      {/* ADVERTISER */}
      {role === "ADVERTISER" && (
        <>
          <div className="mt-6 text-xs text-gray-400 uppercase">
            Advertiser
          </div>
          <nav className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/advertiser/campaigns">
              Campaigns
            </Link>
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/advertiser/stats">
              Stats
            </Link>
          </nav>
        </>
      )}

      {/* ADMIN */}
      {role === "ADMIN" && (
        <>
          <div className="mt-6 text-xs text-gray-400 uppercase">
            Admin
          </div>
          <nav className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/admin/users">
              Users
            </Link>
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/admin/campaigns">
              Campaign Control
            </Link>
            <Link className="px-2 py-1 rounded hover:bg-zinc-800" href="/dashboard/admin/fraud">
              Fraud Monitor
            </Link>
          </nav>
        </>
      )}
    </aside>
  );
}
