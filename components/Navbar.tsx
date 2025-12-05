// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">NightReach</Link>

        <div className="flex items-center gap-6">
          <Link href="/publisher" className="hover:text-gray-300">Publisher</Link>
          <Link href="/advertiser" className="hover:text-gray-300">Advertiser</Link>

          {!session?.user ? (
            <Link href="/login" className="px-4 py-2 bg-blue-600 rounded text-white">
              Login / Signup
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/account" className="px-3 py-2 rounded bg-white/5">
                {session.user?.name ? session.user.name : session.user?.email?.split("@")[0]}
              </Link>

              <button onClick={() => signOut()} className="text-sm text-gray-300">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
