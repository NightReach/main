"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "@/lib/jwt";

type Role = "ADMIN" | "ADVERTISER" | "PUBLISHER";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: Role;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const user = decodeJwt(token);

      // 🔐 Role enforcement
      if (role && user.role !== role) {
        router.push("/dashboard"); // or /403 later
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router, role]);

  return <>{children}</>;
}
