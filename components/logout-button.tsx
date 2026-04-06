"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
      className="rounded-full border border-[#d9cbb8] bg-white px-5 py-3 text-sm font-medium text-ink"
    >
      {loading ? "Ieșire..." : "Logout"}
    </button>
  );
}
