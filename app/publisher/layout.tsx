import React from "react";

export const metadata = { title: "Publisher Dashboard" };

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 p-4 bg-white border-r">
        <h2 className="font-bold text-xl mb-4">NightReach — Publisher</h2>
        <nav className="space-y-2">
          <a href="/publisher" className="block text-sm">Overview</a>
          <a href="/publisher/domains" className="block text-sm">Domains</a>
          <a href="/publisher/smartlinks" className="block text-sm">Smartlinks</a>
          <a href="/publisher/stats" className="block text-sm">Stats</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
