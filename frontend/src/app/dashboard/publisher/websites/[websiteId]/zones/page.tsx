"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/lib/requireAuth";

interface Zone {
  id: string;
  reviveZoneId: number;
  width: number;
  height: number;
  createdAt: string;
}

export default function ZonesPage() {
  useAuth();

  const { websiteId } = useParams();
  const [zones, setZones] = useState<Zone[]>([]);
  const [reviveZoneId, setReviveZoneId] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const fetchZones = async () => {
    const res = await api.get(`/api/websites/${websiteId}/zones`);
    setZones(res.data);
  };

  useEffect(() => {
    fetchZones();
  }, [websiteId]);

  const addZone = async () => {
    if (!reviveZoneId || !width || !height) return;

    await api.post("/api/zones", {
      websiteId,
      reviveZoneId: Number(reviveZoneId),
      width: Number(width),
      height: Number(height),
    });

    setReviveZoneId("");
    setWidth("");
    setHeight("");
    fetchZones();
  };

  const copyTag = async (zoneId: string) => {
    const res = await api.get(`/api/zones/${zoneId}/tag`);
    await navigator.clipboard.writeText(res.data.tag);
    alert("Tag copied to clipboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Zones</h1>

      {/* Add Zone */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Add Zone</h2>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Revive Zone ID"
            value={reviveZoneId}
            onChange={(e) => setReviveZoneId(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <button
            onClick={addZone}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Zones Table */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-3">Revive Zone ID</th>
              <th className="p-3">Size</th>
              <th className="p-3">Created</th>
              <th className="p-3">Tag</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id} className="border-b">
                <td className="p-3">{z.reviveZoneId}</td>
                <td className="p-3">
                  {z.width} × {z.height}
                </td>
                <td className="p-3 text-sm text-gray-500">
                  {new Date(z.createdAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => copyTag(z.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Copy Tag
                  </button>
                </td>
              </tr>
            ))}

            {zones.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No zones yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
