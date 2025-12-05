"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      console.log("Login response:", data);

      // Get redirect path or default to dashboard
      const redirect = searchParams.get("redirect");
      const role = data.user.role.toLowerCase();
      const dashboardPath = `/${role}/dashboard`;
      
      console.log("Login successful, redirecting to:", redirect || dashboardPath);
      
      // Use router.push with a small delay to ensure cookie is set
      setTimeout(() => {
        router.push(redirect || dashboardPath);
        router.refresh(); // Force refresh to load with new auth state
      }, 100);
      
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-6">Log in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 rounded bg-[#181818] border-[#333]"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}