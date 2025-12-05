"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditOffer({ params }: any) {
  const router = useRouter();
  const id = params.id;

  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/offers/" + id);
      const data = await res.json();
      setOffer(data);
    }
    load();
  }, []);

  if (!offer) return "Loading...";

  async function save() {
    await fetch("/api/admin/offers/" + id, {
      method: "PUT",
      body: JSON.stringify({
        title: offer.title,
        payout: Number(offer.payout),
      })
    });

    router.push("/admin/offers");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Offer</h1>

      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          value={offer.title}
          onChange={(e) => setOffer({ ...offer, title: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          value={offer.payout}
          onChange={(e) => setOffer({ ...offer, payout: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
}
