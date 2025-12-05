"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Network Stats Overview</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Total Clicks</h2>
          <p className="text-3xl font-bold">{stats.t

cat << 'EOF' > app/admin/stats/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Network Stats Overview</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Total Clicks</h2>
          <p className="text-3xl font-bold">{stats.t

cat << 'EOF' > app/admin/stats/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Network Stats Overview</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Total Clicks</h2>
          <p className="text-3xl font-bold">{stats.totalClicks}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Total Conversions</h2>
          <p className="text-3xl font-bold">{stats.totalConversions}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Total Payout</h2>
          <p className="text-3xl font-bold">${stats.totalPayout}</p>
        </div>
      </div>
    </div>
  );
}
