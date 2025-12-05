"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminAdvertisers() {
  const [advertisers, setAdvertisers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/advertisers");
      const data = await res.json();
      setAdvertisers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Advertisers</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Offers</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {advertise

cat << 'EOF' > app/admin/advertisers/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminAdvertisers() {
  const [advertisers, setAdvertisers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/advertisers");
      const data = await res.json();
      setAdvertisers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Advertisers</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Offers</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {advertisers.map((a: any) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.id}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2">{a.offers.length}</td>
              <td className="p-2">
                <Link
                  className="text-blue-600"
                  href={"/admin/advertisers/" + a.id}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
