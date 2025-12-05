"use client";

import { useEffect, useState } from "react";

export default function DomainsPage() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    fetch("/api/publishers/domains")
      .then(r => r.json())
      .then(setDomains);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Domains</h1>

      {domains.map(d => (
        <div key={d.id} className="p-3 bg-white rounded shadow mb-2">
          {d.domain} — {d.verified ? "Verified" : "Pending"}
        </div>
      ))}
    </div>
  );
}
