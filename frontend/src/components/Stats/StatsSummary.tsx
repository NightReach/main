type Totals = {
    clicks: number;
    conversions: number;
    revenue: number;
    epc: number;
  };
  
  export default function StatsSummary({ totals }: { totals: Totals }) {
    const items = [
      { label: "Clicks", value: totals.clicks },
      { label: "Conversions", value: totals.conversions },
      { label: "Revenue", value: `$${totals.revenue.toFixed(2)}` },
      { label: "EPC", value: `$${totals.epc.toFixed(2)}` },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4"
          >
            <div className="text-sm text-gray-400">{item.label}</div>
            <div className="text-2xl font-semibold mt-1">{item.value}</div>
          </div>
        ))}
      </div>
    );
  }
  