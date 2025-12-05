"use client";

import { useEffect, useState } from "react";

export default function AdvertiserDetails({ params }: any) {
  const id = params.id;
  const [advertiser, setAdvertiser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/advertisers/" + id);
      const data = await res.json();
      setAdvertiser(data);
    }
    load();
  }, []);

  if (!advertiser) return "Loading...";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Advertiser #{advertiser.id}</h1>

      <p className="mb-4">
        <strong>Email:</strong> {advertiser.email}
      </p>

      <h2 className="text-xl font-semibold mb-2">Offers</h2>

      <ul className="list-disc ml-6">
        {advertiser.offers.map((o: any) => (
          <li key={o.id}>
            {o.title} — ${o.payout}
          </li>
        ))}
      </ul>
    </div>
  );
}
