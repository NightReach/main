"use client";
import { useEffect, useState } from "react";

export default function PublisherDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/publisher/stats");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Publisher Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Impressions" value={stats.impressions} />
        <Card title="Clicks" value={stats.clicks} />
        <Card title="CTR" value={stats.ctr + " %"} />
        <Card title="Conversions" value={stats.conversions} />
        <Card title="Earnings" value={"$" + stats.earnings.toFixed(2)} />
        <Card title="EPC" value={"$" + stats.epc.toFixed(2)} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
