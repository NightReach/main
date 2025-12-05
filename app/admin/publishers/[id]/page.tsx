"use client";

import { useEffect, useState } from "react";

export default function PublisherDetails({ params }: any) {
  const id = params.id;
  const [publisher, setPublisher] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/publishers/" + id);
      const data = await res.json();
      setPublisher(data);
    }
    load();
  }, []);

  if (!publisher) return "Loading...";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Publisher #{publisher.id}</h1>

      <p className="mb-4">
        <strong>Email:</strong> {publisher.email}
      </p>

      <h2 className="text-xl font-semibold mb-2">Domains</h2>

      <ul className="list-disc ml-6">
        {publisher.domains.map((d: any) => (
          <li key={d.id}>{d.domain}</li>
        ))}
      </ul>
    </div>
  );
}
