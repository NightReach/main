"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      setOffers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Offers</h1>

      <Link
        href="/admin/offers/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + New Offer
      </Link>

      <table className="w-full mt-6 border">
        <thead>

cat << 'EOF' > app/admin/offers/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      setOffers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Offers</h1>

      <Link
        href="/admin/offers/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + New Offer
      </Link>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Payout</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o: any) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.title}</td>
              <td className="p-2">${o.payout}</td>
              <td className="p-2">
                <Link href={"/admin/offers/" + o.id} className="text-blue-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
