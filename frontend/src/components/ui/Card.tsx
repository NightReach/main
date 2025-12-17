export default function Card({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {title && (
          <div className="px-6 py-4 border-b text-sm font-semibold text-slate-800">
            {title}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    );
  }
  