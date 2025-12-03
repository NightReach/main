"use client";
import { useState } from "react";

export default function AdvertiserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then(r => r.json());

    console.log(res);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Advertiser Login</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login} className="bg-black text-white p-2 w-full">
        Login
      </button>
    </div>
  );
}
