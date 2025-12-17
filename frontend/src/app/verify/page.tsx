"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?token=${token}`
      )
      .then(() => {
        router.push("/login");
      })
      .catch(() => {
        router.push("/login");
      });
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <p className="text-gray-400">Verifying your email…</p>
    </main>
  );
}
