"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/requireAuth";
import { fetchDailyStats } from "@/lib/stats";
import DailyStatsChart from "@/components/charts/DailyStatsChart";
import StatsSummary from "@/components/Stats/StatsSummary";

export default function StatsPage() {
  useAuth();

  // stats data
  const [stats, setStats] = useState<any[]>([]);
  const [totals, setTotals] = useState<{
    clicks: number;
    conversions: number;
    revenue: number;
    epc: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // filters (Phase 4.2)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [websiteId, setWebsiteId] = useState("");

  useEffect(() => {
    setLoading(true);

    fetchDailyStats({
      startDate,
      endDate,
      campaignId,
      zoneId,
      websiteId,
    })
      .then((res) => {
        setStats(res.stats || []);
        setTotals(res.totals || null);
      })
      .finally(() => setLoading(false));
  }, [startDate, endDate, campaignId, zoneId, websiteId]);

  if (loading) {
    return <div className="p-6">Loading stats…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stats</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />

        <select
          value={websiteId}
          onChange={(e) => setWebsiteId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Websites</option>
        </select>

        <select
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Campaigns</option>
        </select>

        <select
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Zones</option>
        </select>
      </div>

      {/* Summary + Chart */}
      {stats.length === 0 ? (
        <div className="text-gray-500">No data yet</div>
      ) : (
        <>
          {totals && <StatsSummary totals={totals} />}
          <DailyStatsChart data={stats} />
        </>
      )}
    </div>
  );
}
