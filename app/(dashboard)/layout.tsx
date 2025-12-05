export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white p-4 border-r">
          <h2 className="font-bold text-xl mb-4">NightReach</h2>
  
          <nav className="space-y-2">
            <a href="/publisher" className="block">Publisher Dashboard</a>
            <a href="/advertiser" className="block">Advertiser Dashboard</a>
          </nav>
        </aside>
  
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }
  