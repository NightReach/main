"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOfferPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payout, setPayout] = useState("");
  const [landingUrl, setLandingUrl] = useState(""); // NEW
  const [advertiserId, setAdvertiserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        payout: parseFloat(payout),
        landingUrl, // NEW
        advertiserId: parseInt(advertiserId),
      }),
    });

    if (res.ok) {
      router.push("/dashboard/offers");
      router.refresh();
    } else {
      alert("Failed to create offer");
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Create New Offer</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        {/* Title */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Payout */}
        <div>
          <label className="block mb-1">Payout ($)</label>
          <input
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            required
            type="number"
            step="0.01"
          />
        </div>

        {/* Landing URL — NEW */}
        <div>
          <label className="block mb-1">Landing URL</label>
          <input
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={landingUrl}
            onChange={(e) => setLandingUrl(e.target.value)}
            placeholder="https://example.com/landing-page"
            required
            type="url"
          />
        </div>

        {/* Advertiser ID */}
        <div>
          <label className="block mb-1">Advertiser ID</label>
          <input
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={advertiserId}
            onChange={(e) => setAdvertiserId(e.target.value)}
            required
            type="number"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Offer
        </button>
      </form>
    </div>
  );
}
