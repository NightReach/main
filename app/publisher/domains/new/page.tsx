"use client";
import { useState } from "react";
export default function NewDomain() {
  const [domain,setDomain]=useState("");
  const [msg,setMsg]=useState("");
  async function submit(e:any){ e.preventDefault();
    const res = await fetch("/api/domain/add", { method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({ domain })});
    const j = await res.json();
    setMsg(j.error ? "Error: "+j.error : "Added. Verification token: "+(j.verifyToken||""));
  }
  return (
    <div>
      <h1 className="text-xl font-semibold">Add Domain</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input value={domain} onChange={(e)=>setDomain(e.target.value)} placeholder="example.com" className="p-2 border rounded w-72" />
        <div><button className="px-3 py-1 bg-blue-600 text-white rounded">Add Domain</button></div>
      </form>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
