import prisma from "@/lib/prisma";
import StatsCard from "@/components/admin/StatsCard";
import StatsChart from "@/components/admin/StatsChart";

export default async function AdminDashboard() {
  const impressions = await prisma.impression.count();
  const clicks = await prisma.click.count();
  const conversions = await prisma.conversion.count();

  const revenue = await prisma.conversion.aggregate({
    _sum: { payout: true }
  });

  const chartData = await prisma.$queryRaw`
    SELECT 
      DATE(createdAt) as date,
      COUNT(*) FILTER (WHERE type='impression') AS impressions,
      COUNT(*) FILTER (WHERE type='click') AS clicks,
      COUNT(*) FILTER (WHERE type='conversion') AS conversions
    FROM (
      SELECT createdAt, 'impression' AS type FROM Impression
      UNION ALL
      SELECT createdAt, 'click' AS type FROM Click
      UNION ALL
      SELECT createdAt, 'conversion' AS type FROM Conversion
    ) t
    GROUP BY DATE(createdAt)
    ORDER BY DATE(createdAt)
  `;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Impressions" value={impressions} />
        <StatsCard title="Clicks" value={clicks} />
        <StatsCard title="Conversions" value={conversions} />
        <StatsCard
          title="Revenue"
          value={`$${revenue._sum.payout?.toFixed(2) || "0.00"}`}
        />
      </div>

      <StatsChart data={chartData as any[]} />
    </div>
  );
}

