"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Publishers" value={stats.publishers} />
        <Card title="Advertisers" value={stats.advertisers} />
        <Card title="Offers" value={stats.offers} />
        <Card title="Clicks" value={stats.clicks} />
        <Card title="Conversions" value={stats.conversions} />
        <Card title="Total Earnings" value={"$" + stats.earnings.toFixed(2)} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
