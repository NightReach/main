"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/offers" className="hover:text-gray-300">Offers</Link>
          <Link href="/admin/publishers" className="hover:text-gray-300">Publishers</Link>
          <Link href="/admin/advertisers" className="hover:text-gray-300">Advertisers</Link>
          <Link href="/admin/payouts" className="hover:text-gray-300">Payouts</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>


cat << 'EOF' > app/admin/layout.tsx
"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/offers" className="hover:text-gray-300">Offers</Link>
          <Link href="/admin/publishers" className="hover:text-gray-300">Publishers</Link>
          <Link href="/admin/advertisers" className="hover:text-gray-300">Advertisers</Link>
          <Link href="/admin/payouts" className="hover:text-gray-300">Payouts</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>

cat << 'EOF' > app/admin/layout.tsx
"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/offers" className="hover:text-gray-300">Offers</Link>
          <Link href="/admin/publishers" className="hover:text-gray-300">Publishers</Link>
          <Link href="/admin/advertisers" className="hover:text-gray-300">Advertisers</Link>
          <Link href="/admin/payouts" className="hover:text-gray-300">Payouts</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
