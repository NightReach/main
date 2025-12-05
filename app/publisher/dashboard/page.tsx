// app/publisher/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import React from "react";

function formatNumber(n: number) {
  return n.toLocaleString();
}

function formatCurrency(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export default async function PublisherDashboardPage() {
  // TEMP: publisherId hardcoded until you have auth
  const publisherId = 1;

  // 1) Load top offers (include counts)
  // We include counts for clicks & conversions which are directly related in your schema.
  // Sort by clicks descending (use _count.clicks).
  const offers = await prisma.offer.findMany({
    include: {
      _count: {
        select: {
          clicks: true,
          conversions: true,
        },
      },
    },
    orderBy: {
      // Prisma can't order directly by nested _count in sqlite older versions,
      // so fetch then sort client-side as fallback.
      // We'll sort client-side below to be safe.
      id: "desc",
    },
    take: 50,
  });

  // 2) For robustness: sort offers by clicks count descending
  const offersSorted = offers.sort((a, b) => (b._count?.clicks ?? 0) - (a._count?.clicks ?? 0));

  // 3) Map to table-ready data
  const rows = offersSorted.map((o) => {
    const clicks = o._count?.clicks ?? 0;
    const conversions = o._count?.conversions ?? 0;
    const totalPayout = (o.payout ?? 0) * conversions; // total paid for this offer (conversions * payout)
    return {
      id: o.id,
      title: o.title,
      clicks,
      conversions,
      payoutPerConv: o.payout ?? 0,
      totalPayout,
    };
  });

  // Render UI — Voluum-like table (dark theme)
  return (
    <div className="min-h-screen bg-[#0E0F11] text-white p-6 space-y-8">
      {/* KPI row : small summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-[#141518] border border-[#1F2023] rounded-xl p-5 shadow-sm">
          <div className="text-sm text-neutral-400 tracking-wide">Total Clicks</div>
          <div className="text-3xl font-bold mt-2">{formatNumber(rows.reduce((s, r) => s + r.clicks, 0))}</div>
        </div>

        <div className="bg-[#141518] border border-[#1F2023] rounded-xl p-5 shadow-sm">
          <div className="text-sm text-neutral-400 tracking-wide">Conversions</div>
          <div className="text-3xl font-bold mt-2">{formatNumber(rows.reduce((s, r) => s + r.conversions, 0))}</div>
        </div>

        <div className="bg-[#141518] border border-[#1F2023] rounded-xl p-5 shadow-sm">
          <div className="text-sm text-neutral-400 tracking-wide">Total Earnings</div>
          <div className="text-3xl font-bold mt-2">
            {formatCurrency(rows.reduce((s, r) => s + r.totalPayout, 0))}
          </div>
        </div>

        <div className="bg-[#141518] border border-[#1F2023] rounded-xl p-5 shadow-sm">
          <div className="text-sm text-neutral-400 tracking-wide">Top Offer EPC</div>
          <div className="text-3xl font-bold mt-2">
            {rows.length ? `$${(rows[0].conversions ? (rows[0].totalPayout / rows[0].conversions).toFixed(2) : 0)}` : "$0.00"}
          </div>
        </div>
      </div>

      {/* Top Offers table */}
      <div className="bg-[#141518] border border-[#1F2023] rounded-xl overflow-hidden">
        <div className="px-6 py-4 text-lg font-semibold border-b border-[#1F2023]">
          Top Offers
        </div>

        <div className="p-6">
          <div className="rounded-lg overflow-hidden border border-[#1F2023]">
            <table className="w-full text-sm">
              <thead className="bg-[#1A1B1F] text-neutral-300 text-sm">
                <tr>
                  <th className="p-4 text-left font-medium">Offer</th>
                  <th className="p-4 text-left font-medium">Clicks</th>
                  <th className="p-4 text-left font-medium">Conversions</th>
                  <th className="p-4 text-left font-medium">Payout</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={`border-t border-[#1F2023] ${idx % 2 === 0 ? "bg-[#141518]" : "bg-[#17181B]"} hover:bg-[#1C1D21] transition`}
                  >
                    <td className="p-4">{r.title}</td>
                    <td className="p-4">{formatNumber(r.clicks)}</td>
                    <td className="p-4">{formatNumber(r.conversions)}</td>
                    <td className="p-4">
                      {/* show both per-conversion and total (optional). change to your preference */}
                      <div>{formatCurrency(r.payoutPerConv)} / conv</div>
                      <div className="text-neutral-400 text-sm mt-1">Total: {formatCurrency(r.totalPayout)}</div>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-neutral-400" colSpan={4}>
                      No offers yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
