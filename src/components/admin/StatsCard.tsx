export default function StatsCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-sm">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

