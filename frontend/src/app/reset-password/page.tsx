"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!token) {
      setError("Invalid reset link");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        { token, password }
      );

      router.push("/login");
    } catch {
      setError("Reset link is invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded">
        <h1 className="text-xl font-semibold mb-4">Set new password</h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="password"
          className="w-full mb-4 p-3 bg-gray-800 rounded"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 p-3 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Reset password"}
        </button>
      </div>
    </div>
  );
}
