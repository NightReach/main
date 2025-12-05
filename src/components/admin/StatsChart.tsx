"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function StatsChart({ data }: { data: any[] }) {
  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
      <h3 className="text-gray-200 mb-3">Traffic Overview</h3>
      <LineChart width={600} height={250} data={data}>
        <Line type="monotone" dataKey="impressions" stroke="#8884d8" />
        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
        <Line type="monotone" dataKey="conversions" stroke="#ff6767" />
        <CartesianGrid stroke="#333" />
        <XAxis dataKey="date" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

