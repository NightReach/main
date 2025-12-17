"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/requireAuth";

interface Website {
  id: string;
  domain: string;
  reviveWebsiteId: number;
  createdAt: string;
}

export default function WebsitesPage() {
  useAuth();

  const [websites, setWebsites] = useState<Website[]>([]);
  const [domain, setDomain] = useState("");
  const [reviveWebsiteId, setReviveWebsiteId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWebsites = async () => {
    const res = await api.get("/api/websites");
    setWebsites(res.data);
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const addWebsite = async () => {
    if (!domain || !reviveWebsiteId) return;

    setLoading(true);
    await api.post("/api/websites", {
      domain,
      reviveWebsiteId: Number(reviveWebsiteId),
    });

    setDomain("");
    setReviveWebsiteId("");
    setLoading(false);
    fetchWebsites();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Websites</h1>

      {/* Add Website */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Add Website</h2>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <input
            className="border p-2 rounded w-1/3"
            placeholder="Revive Website ID"
            value={reviveWebsiteId}
            onChange={(e) => setReviveWebsiteId(e.target.value)}
          />

          <button
            onClick={addWebsite}
            disabled={loading}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow">
  <table className="w-full text-left">
    <thead className="border-b bg-gray-50">
      <tr>
        <th className="p-3">Domain</th>
        <th className="p-3">Revive ID</th>
        <th className="p-3">Created</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>

    <tbody>
      {websites.map((w) => (
        <tr key={w.id} className="border-b hover:bg-gray-50">
          <td className="p-3">{w.domain}</td>
          <td className="p-3">{w.reviveWebsiteId}</td>
          <td className="p-3 text-sm text-gray-500">
            {new Date(w.createdAt).toLocaleString()}
          </td>
          <td className="p-3">
            <a
              href={`/dashboard/websites/${w.id}/zones`}
              className="text-blue-600 hover:underline font-medium"
            >
              View Zones →
            </a>
          </td>
        </tr>
      ))}

      {websites.length === 0 && (
        <tr>
          <td colSpan={4} className="p-4 text-center text-gray-500">
            No websites yet
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  );
}
