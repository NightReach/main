"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="h-14 border-b flex items-center justify-end px-6">
      <button
        onClick={logout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
