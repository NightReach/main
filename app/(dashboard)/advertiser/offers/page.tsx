"use client";
import { useEffect, useState } from "react";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("/api/offers/list")
      .then(r => r.json())
      .then(setOffers);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Offers</h1>

      {offers.map(o => (
        <div key={o.id} className="p-4 bg-white mb-2 shadow rounded">
          <div className="font-semibold">{o.title}</div>
          <div className="text-sm text-gray-600">Payout: ${o.payout}</div>
        </div>
      ))}
    </div>
  );
}
