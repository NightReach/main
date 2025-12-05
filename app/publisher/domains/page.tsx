"use client";
import { useEffect, useState } from "react";

export default function DomainsPage() {
  const [domains, setDomains] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/domain/list").then(r=>r.json()).then(d=>setDomains(d || []));
  }, []);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Your Domains</h1>
      <a href="/publisher/domains/new" className="text-sm text-blue-600">+ Add domain</a>
      <div className="mt-4 space-y-2">
        {domains.length===0 ? <div className="text-gray-500">No domains</div> : domains.map(d=>(
          <div key={d.id} className="p-3 bg-white rounded shadow-sm">
            <div className="font-medium">{d.domain}</div>
            <div className="text-sm text-gray-600">{d.verified ? "Verified" : "Pending"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
