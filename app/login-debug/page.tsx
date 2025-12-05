"use client";

import { useState } from "react";

export default function LoginDebugPage() {
  const [email, setEmail] = useState("abcd@gmail.com");
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    console.log(msg);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogs([]);
    
    addLog("🔵 Starting login...");

    try {
      addLog("🔵 Sending POST to /api/login");
      
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      addLog(`🔵 Response status: ${res.status}`);

      const data = await res.json();
      addLog(`🔵 Response data: ${JSON.stringify(data)}`);

      if (!res.ok) {
        addLog(`❌ Login failed: ${data.error}`);
        return;
      }

      addLog(`✅ Login successful!`);
      addLog(`✅ User: ${data.user.email}`);
      addLog(`✅ Role: ${data.user.role}`);

      const role = data.user.role.toLowerCase();
      const dashboardPath = `/${role}/dashboard`;
      
      addLog(`🔵 Dashboard path: ${dashboardPath}`);

      // Check cookies
      addLog(`🔵 Current cookies: ${document.cookie}`);

      // Try direct navigation
      addLog(`🔵 Attempting navigation to ${dashboardPath}...`);
      
      // Method 1: window.location
      addLog(`🔵 Using window.location.href`);
      window.location.href = dashboardPath;
      
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login Debug Mode</h1>
        
        <form onSubmit={handleLogin} className="bg-[#111] border border-[#222] p-6 rounded-xl mb-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full bg-[#181818] border border-[#333] p-2.5 rounded text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full bg-[#181818] border border-[#333] p-2.5 rounded text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 py-2.5 rounded hover:bg-blue-700"
            >
              Test Login
            </button>
          </div>
        </form>

        <div className="bg-[#111] border border-[#222] p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Debug Logs:</h2>
          {logs.length === 0 ? (
            <p className="text-gray-400">No logs yet. Click "Test Login" above.</p>
          ) : (
            <div className="space-y-1 font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i} className="text-gray-300">{log}</div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <a href="/login" className="block bg-gray-600 px-4 py-2 rounded text-center hover:bg-gray-700">
            Back to Normal Login
          </a>
          <a href="/test-auth" className="block bg-green-600 px-4 py-2 rounded text-center hover:bg-green-700">
            Check Auth Status
          </a>
        </div>
      </div>
    </div>
  );
}