export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">NightReach</h1>
        <p className="text-gray-400 mb-6">
          Performance Ad Network Dashboard
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 rounded border border-gray-700 hover:bg-gray-800"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
}
