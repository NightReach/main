"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/requireAuth";

interface Campaign {
  id: string;
  name: string;
  status: string;
  reviveCampaignId: number;
  payoutType: string;
  payoutValue: number;
  createdAt: string;
}

export default function CampaignsPage() {
  useAuth();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [name, setName] = useState("");
  const [reviveCampaignId, setReviveCampaignId] = useState("");
  const [payoutType, setPayoutType] = useState("CPC");
  const [payoutValue, setPayoutValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    const res = await api.get("/api/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const addCampaign = async () => {
    if (!name || !reviveCampaignId || !payoutValue) return;

    setLoading(true);
    await api.post("/api/campaigns", {
      name,
      reviveCampaignId: Number(reviveCampaignId),
      payoutType,
      payoutValue: Number(payoutValue),
    });

    setName("");
    setReviveCampaignId("");
    setPayoutValue("");
    setLoading(false);
    fetchCampaigns();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>

        <a
          href="/dashboard/campaigns/attach"
          className="text-blue-600 hover:underline text-sm"
        >
          Attach Campaign to Zone →
        </a>
      </div>

      {/* Add Campaign */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create Campaign</h2>

        <div className="grid grid-cols-5 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Revive Campaign ID"
            value={reviveCampaignId}
            onChange={(e) => setReviveCampaignId(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={payoutType}
            onChange={(e) => setPayoutType(e.target.value)}
          >
            <option value="CPC">CPC</option>
            <option value="CPA">CPA</option>
            <option value="CPM">CPM</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Payout Value"
            value={payoutValue}
            onChange={(e) => setPayoutValue(e.target.value)}
          />

          <button
            onClick={addCampaign}
            disabled={loading}
            className="bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Revive ID</th>
              <th className="p-3">Payout</th>
              <th className="p-3">Created</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.name}</td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-700">
                    {c.status}
                  </span>
                </td>

                <td className="p-3">{c.reviveCampaignId}</td>

                <td className="p-3">
                  {c.payoutType} — {c.payoutValue}
                </td>

                <td className="p-3 text-sm text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </td>

                <td className="p-3">
                  <a
                    href="/dashboard/advertiser/campaigns/attach"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Attach
                  </a>
                </td>
              </tr>
            ))}

            {campaigns.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No campaigns yet — create one above 👆
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
