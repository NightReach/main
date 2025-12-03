// app/publisher/domains/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDomainPage() {
  const [domain, setDomain] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/publisher/add-domain", {
      method: "POST",
      body: JSON.stringify({ domain }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.ok) router.push("/publisher");
    else alert("Failed to add domain");
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Domain</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="example.com (no https)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">
          {loading ? "Adding..." : "Add domain"}
        </button>
      </form>
    </div>
  );
}
