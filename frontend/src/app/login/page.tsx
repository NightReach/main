"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg border border-gray-800">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm">{error}</div>
        )}

        <input
          className="w-full mb-3 p-3 bg-gray-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 bg-gray-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
