"use client";

import { useEffect, useState } from "react";

export default function PublisherSmartlink() {
  const [smartlink, setSmartlink] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/publisher/smartlink");
      const data = await res.json();
      setSmartlink(data.url);
    }
    load();
  }, []);

  if (!smartlink) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Smartlink</h1>

      <div className="p-6 border rounded-xl bg-white shadow-sm max-w-2xl">
        <p className="font-mono text-lg break-all">{smartlink}</p>

        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => navigator.clipboard.writeText(smartlink)}

cat << 'EOF' > src/app/publisher/smartlink/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function PublisherSmartlink() {
  const [smartlink, setSmartlink] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/publisher/smartlink");
      const data = await res.json();
      setSmartlink(data.url);
    }
    load();
  }, []);

  if (!smartlink) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Smartlink</h1>

      <div className="p-6 border rounded-xl bg-white shadow-sm max-w-2xl">
        <p className="font-mono text-lg break-all">{smartlink}</p>

        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => navigator.clipboard.writeText(smartlink)}
        >
          Copy
        </button>

        <a
          href={smartlink}
          target="_blank"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Test Link
        </a>
      </div>
    </div>
  );
}
