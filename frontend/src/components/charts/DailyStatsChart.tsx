"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Stat {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export default function DailyStatsChart({ data }: { data: Stat[] }) {
  return (
    <div className="bg-white rounded shadow p-4 h-[350px]">
      <h2 className="font-semibold mb-3">Daily Performance</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="clicks" stroke="#2563eb" />
          <Line type="monotone" dataKey="conversions" stroke="#16a34a" />
          <Line type="monotone" dataKey="revenue" stroke="#9333ea" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
