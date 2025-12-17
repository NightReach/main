"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

type FraudEvent = {
  id: string;
  type: string;
  severity: number;
  campaignId?: string;
  zoneId?: string;
  ip?: string;
  userAgent?: string;
  meta?: string;
  createdAt: string;
};

export default function AdminFraudPage() {
  const [events, setEvents] = useState<FraudEvent[]>([]);

  useEffect(() => {
    api.get("/api/admin/fraud").then((res) => setEvents(res.data));
  }, []);

  return (
    <ProtectedRoute role="ADMIN">
      <div>
        <h1 className="text-2xl font-bold mb-6">Fraud Events</h1>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Time</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Campaign</th>
              <th>Zone</th>
              <th>IP</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-t">
                <td>
                  {new Date(e.createdAt).toLocaleString()}
                </td>
                <td>{e.type}</td>
                <td>
                  <span
                    className={
                      e.severity >= 5
                        ? "text-red-600"
                        : e.severity >= 3
                        ? "text-orange-500"
                        : "text-yellow-600"
                    }
                  >
                    {e.severity}
                  </span>
                </td>
                <td className="truncate">{e.campaignId || "-"}</td>
                <td className="truncate">{e.zoneId || "-"}</td>
                <td>{e.ip || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
