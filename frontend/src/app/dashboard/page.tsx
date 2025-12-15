"use client";

import { useRequireAuth } from "@/lib/requireAuth";

export default function DashboardPage() {
  useRequireAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        NightReach system online 🚀
      </p>
    </div>
  );
}
