"use client";

import { useEffect, useState } from "react";
import { decodeJwt } from "@/lib/jwt";
import { useRouter } from "next/navigation";

export function useAuth(requiredRole?: "ADMIN") {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = decodeJwt(token);

    if (!decoded || decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (requiredRole && decoded.role !== requiredRole) {
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  }, [router, requiredRole]);

  return { loading };
}
