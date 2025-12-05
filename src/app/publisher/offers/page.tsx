"use client";
import { useEffect, useState } from "react";

export default function PublisherOffers() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/publisher/offers");
      const data = await res.json();
      setOffers(data);
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Offers</h1>

      <div className="grid grid-cols-1 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border p-6 rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-700 mb-3">{offer.description}</p>
            <p className="font-bold text-green-700">Payout: ${offer.payout}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
