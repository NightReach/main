"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (session.user.role === "ADVERTISER") {
      router.push("/advertiser/dashboard");
    } else if (session.user.role === "PUBLISHER") {
      router.push("/publisher/dashboard");
    } else {
      router.push("/");
    }
  }, [status, session, router]);

  return <p>Redirecting...</p>;
}
