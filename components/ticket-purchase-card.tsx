"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type TicketPurchaseCardProps = {
  eventId: string;
  requiresAuth: boolean;
};

export function TicketPurchaseCard({ eventId, requiresAuth }: TicketPurchaseCardProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (requiresAuth) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, eventId, quantity: 1 })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.url) {
      setError(data?.error ?? "Checkout Stripe indisponibil.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  const inputClass =
    "rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]";

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="section-kicker">Buy Ticket</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Secure checkout</h2>
      <p className="mt-3 text-sm leading-7 text-ink/58">
        Completeaza datele si continua plata in Stripe. Biletul apare in cont doar dupa confirmarea platii.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm text-ink/72">
          Nume complet
          <input name="fullName" required className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          Email
          <input type="email" name="email" required className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          CNP
          <input name="cnp" inputMode="numeric" maxLength={13} required className={inputClass} />
        </label>

        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={loading} className="cta-primary disabled:opacity-60">
          {requiresAuth ? "Login pentru cumpărare" : loading ? "Se procesează..." : "Cumpără bilet"}
        </button>
      </form>
    </div>
  );
}
