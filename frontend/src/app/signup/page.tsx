"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PUBLISHER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
            {
              email,
              password,
              role,
            }
          );

      router.push("/verify-email");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-gray-800 p-8 rounded-xl"
      >
        <h1 className="text-2xl mb-6 font-semibold">Create Account</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-black border border-gray-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 bg-black border border-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full mb-6 p-3 bg-black border border-gray-700 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="PUBLISHER">Publisher</option>
          <option value="ADVERTISER">Advertiser</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded hover:bg-gray-200"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="mt-4 text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </form>
    </main>
  );
}
