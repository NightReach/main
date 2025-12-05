"use client";

import { useEffect, useState } from "react";

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        console.log("Auth check response:", data);
        if (data.user) {
          setUser(data.user);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch(err => {
        console.error("Auth check error:", err);
        setError("Failed to check auth status");
      })
      .finally(() => setLoading(false));
  }, []);

  const checkCookies = () => {
    console.log("All cookies:", document.cookie);
    alert("Check console for cookies");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Auth Status Test</h1>
        
        <div className="bg-[#111] border border-[#222] p-6 rounded-xl space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Status:</h2>
            {user ? (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded">
                ✅ Authenticated
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded">
                ❌ Not Authenticated: {error}
              </div>
            )}
          </div>

          {user && (
            <div>
              <h2 className="text-xl font-semibold mb-2">User Info:</h2>
              <pre className="bg-[#181818] p-4 rounded overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Actions:</h2>
            <div className="space-y-2">
              <button
                onClick={checkCookies}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Check Cookies (Console)
              </button>
              
              {user && (
                <a
                  href={`/${user.role.toLowerCase()}/dashboard`}
                  className="block bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-center"
                >
                  Go to Dashboard
                </a>
              )}
              
              <a
                href="/login"
                className="block bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 text-center"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}