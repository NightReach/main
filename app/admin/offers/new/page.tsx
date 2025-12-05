"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewOffer() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [payout, setPayout] = useState("");

  async function submit() {
    await fetch("/api/admin/offers", {
      method: "POST",
      body: JSON.stringify({ title, payout: parseFloat(payout) })
    });
    router.push("/admin/offers");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Offer</h1>

      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Payout"
          onChange={(e) => setPayout(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={submit}
        >
          Save Offer
        </button>
      </div>
    </div>
  );
}
