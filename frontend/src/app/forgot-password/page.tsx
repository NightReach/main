"use client";

import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      { email }
    );

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded">
        <h1 className="text-xl font-semibold mb-4">Reset password</h1>

        {sent ? (
          <p className="text-gray-400">
            If an account exists, a reset link has been sent to your email.
          </p>
        ) : (
          <>
            <input
              className="w-full mb-4 p-3 bg-gray-800 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-indigo-600 p-3 rounded disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
