"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

type Campaign = {
  id: string;
  name: string;
  status: string;
  payoutType: string;
  payoutValue: number;
  forcePaused: boolean;
  user: {
    email: string;
  };
};

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const load = async () => {
    const res = await api.get("/api/admin/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id: string) => {
    await api.post(`/api/admin/campaigns/${id}/toggle`);
    load();
  };

  return (
    <ProtectedRoute role="ADMIN">
      <div>
        <h1 className="text-2xl font-bold mb-6">Campaign Control</h1>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Advertiser</th>
              <th>Payout</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-t">
                <td>{c.name}</td>
                <td>{c.user.email}</td>
                <td>
                  {c.payoutType} ${c.payoutValue}
                </td>
                <td>
                  {c.forcePaused ? "FORCE PAUSED" : c.status}
                </td>
                <td>
                  <button
                    onClick={() => toggle(c.id)}
                    className="text-blue-600 underline"
                  >
                    {c.forcePaused ? "Resume" : "Force Pause"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
