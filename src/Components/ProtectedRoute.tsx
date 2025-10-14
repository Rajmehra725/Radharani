'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unlocked = localStorage.getItem("isUnlocked");
    if (!unlocked) {
      router.replace("/"); // ⚡ direct redirect, without showing page
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    // ⏳ Jab tak check ho raha hai, kuch bhi render mat karo
    return null;
  }

  return <>{children}</>;
}
