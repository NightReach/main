"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPublishers() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/publishers");
      const data = await res.json();
      setPublishers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Publishers</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Domains</th>
            <th className="p-2">Acti

cat << 'EOF' > app/admin/publishers/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPublishers() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/publishers");
      const data = await res.json();
      setPublishers(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Publishers</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Domains</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {publishers.map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">
                {p.domains.map((d: any) => d.domain).join(", ")}
              </td>
              <td className="p-2">
                <Link
                  className="text-blue-600"
                  href={"/admin/publishers/" + p.id}
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
