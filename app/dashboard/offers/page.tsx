// app/dashboard/offers/page.tsx
import {prisma} from "@/lib/prisma";

export default function Page() {
  return (
    <div className="p-6 space-y-6">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
          <div className="text-neutral-500 text-sm">Clicks</div>
          <div className="text-3xl font-semibold mt-1">12,482</div>
          <div className="text-xs text-green-500 mt-1">▲ 14.3%</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
          <div className="text-neutral-500 text-sm">Conversions</div>
          <div className="text-3xl font-semibold mt-1">642</div>
          <div className="text-xs text-red-500 mt-1">▼ 3.8%</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
          <div className="text-neutral-500 text-sm">Payout</div>
          <div className="text-3xl font-semibold mt-1">$4,392</div>
          <div className="text-xs text-green-500 mt-1">▲ 8.1%</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
          <div className="text-neutral-500 text-sm">EPC</div>
          <div className="text-3xl font-semibold mt-1">$0.35</div>
          <div className="text-xs text-green-500 mt-1">▲ 1.4%</div>
        </div>
      </div>

      {/* TABLE PLACEHOLDER */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm">
        <div className="text-lg font-semibold mb-4">Top Offers</div>

        <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              <tr>
                <th className="text-left p-3">Offer</th>
                <th className="text-left p-3">Clicks</th>
                <th className="text-left p-3">Conversions</th>
                <th className="text-left p-3">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="p-3">Crypto Smart Link</td>
                <td className="p-3">2,934</td>
                <td className="p-3">120</td>
                <td className="p-3">$540</td>
              </tr>

              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="p-3">Casino CPL</td>
                <td className="p-3">1,203</td>
                <td className="p-3">68</td>
                <td className="p-3">$340</td>
              </tr>

              <tr className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="p-3">Dating SOI — Tier 2</td>
                <td className="p-3">984</td>
                <td className="p-3">31</td>
                <td className="p-3">$155</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
