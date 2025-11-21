"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("logged_in");
    if (!logged) router.push("/login");
  }, []);

  return <>{children}</>;
}
