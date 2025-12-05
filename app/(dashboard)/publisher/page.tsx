export default function PublisherHome() {
    return (
      <div>
        <h1 className="text-2xl font-bold">Publisher Dashboard</h1>
  
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/publisher/domains" className="p-4 bg-white rounded shadow">
            Manage Domains
          </a>
  
          <a href="/publisher/stats" className="p-4 bg-white rounded shadow">
            Stats
          </a>
  
          <a href="/publisher/smartlink" className="p-4 bg-white rounded shadow">
            Smartlink
          </a>
        </div>
      </div>
    );
  }
  