"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      const code = err.response?.data?.error;

      if (code === "EMAIL_NOT_VERIFIED") {
        setError("Please verify your email before logging in.");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setInfo("");
    setError("");

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`,
      { email }
    );

    setInfo("Verification email resent. Please check your inbox.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg border border-gray-800">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {error && <div className="mb-3 text-red-400 text-sm">{error}</div>}
        {info && <div className="mb-3 text-green-400 text-sm">{info}</div>}

        <input
          className="w-full mb-3 p-3 bg-gray-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 bg-gray-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
  href="/forgot-password"
  className="block text-sm text-gray-400 underline mb-4"
>
  Forgot password?
</a>

        {error.includes("verify") && (
          <button
            onClick={resendVerification}
            className="text-sm text-gray-400 underline mb-4"
          >
            Resend verification email
          </button>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
