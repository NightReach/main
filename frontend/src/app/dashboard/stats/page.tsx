"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRequireAuth } from "@/lib/requireAuth";

interface Stats {
  clicks: number;
  conversions: number;
  revenue?: number;
  spend?: number;
  epc: number;
}

export default function StatsPage() {
  useRequireAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Backend decides which stats based on role
      const res = await api.get("/api/stats/publisher");
      setStats(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-red-500">Failed to load stats</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Stats Overview</h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard label="Clicks" value={stats.clicks} />
        <StatCard label="Conversions" value={stats.conversions} />
        {"revenue" in stats && (
          <StatCard label="Revenue" value={`$${stats.revenue}`} />
        )}
        {"spend" in stats && (
          <StatCard label="Spend" value={`$${stats.spend}`} />
        )}
        <StatCard label="EPC" value={stats.epc.toFixed(3)} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded shadow p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
