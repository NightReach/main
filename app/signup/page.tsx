"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "publisher",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error when user types
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          name: formData.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Redirect to login on success
      router.push("/login?message=Account created successfully");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="w-full max-w-md bg-[#111] border border-[#222] p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-400 text-center mb-6">Join our platform today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Full Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors pr-12"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Must be 8+ characters with uppercase, lowercase, and number
            </p>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Confirm Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-300">
              Account Type *
            </label>
            <select
              name="role"
              className="w-full bg-[#181818] border border-[#333] p-2.5 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="publisher">Publisher - Share offers and earn</option>
              <option value="advertiser">Advertiser - Promote your products</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}