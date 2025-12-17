"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/requireAuth";

export default function AttachCampaignZonePage() {
  useAuth();

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [websites, setWebsites] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);

  const [campaignId, setCampaignId] = useState("");
  const [websiteId, setWebsiteId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/campaigns").then((res) => setCampaigns(res.data));
    api.get("/api/websites").then((res) => setWebsites(res.data));
  }, []);

  useEffect(() => {
    if (!websiteId) return;
    api
      .get(`/api/websites/${websiteId}/zones`)
      .then((res) => setZones(res.data));
  }, [websiteId]);

  const attach = async () => {
    if (!campaignId || !zoneId) return;

    setLoading(true);
    await api.post("/api/campaigns/attach-zone", {
      campaignId,
      zoneId,
    });
    setLoading(false);

    alert("Campaign attached to zone ✅");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attach Campaign to Zone</h1>

      <div className="bg-white p-4 rounded shadow max-w-xl">
        <div className="space-y-4">

          {/* Campaign */}
          <select
            className="border p-2 rounded w-full"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          >
            <option value="">Select Campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Website */}
          <select
            className="border p-2 rounded w-full"
            value={websiteId}
            onChange={(e) => {
              setWebsiteId(e.target.value);
              setZoneId("");
            }}
          >
            <option value="">Select Website</option>
            {websites.map((w) => (
              <option key={w.id} value={w.id}>
                {w.domain}
              </option>
            ))}
          </select>

          {/* Zone */}
          <select
            className="border p-2 rounded w-full"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            disabled={!zones.length}
          >
            <option value="">Select Zone</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.width}×{z.height} (Revive #{z.reviveZoneId})
              </option>
            ))}
          </select>

          <button
            onClick={attach}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {loading ? "Attaching..." : "Attach Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}
