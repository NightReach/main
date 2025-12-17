"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "@/lib/jwt";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const user = decodeJwt(token);
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role === "ADMIN") {
      router.push("/dashboard/admin");
    } else if (user.role === "ADVERTISER") {
      router.push("/dashboard/advertiser");
    } else {
      router.push("/dashboard/publisher");
    }
  }, [router]);

  return null;
}
