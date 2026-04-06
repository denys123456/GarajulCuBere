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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (requiresAuth) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, eventId })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Checkout failed");
      setLoading(false);
      return;
    }

    setSuccess("Biletul a fost salvat în contul tău.");
    setLoading(false);
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="premium-border glass-panel rounded-[2rem] p-6">
      <p className="section-kicker">Buy Ticket</p>
      <h2 className="mt-4 font-display text-4xl text-white">Secure checkout</h2>
      <p className="mt-3 text-sm leading-7 text-white/58">
        Completarea datelor este obligatorie. Biletul este asociat contului autentificat și apare imediat în My Tickets.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm text-white/72">
          Nume complet
          <input
            name="fullName"
            required
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-amber/45"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-amber/45"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          CNP
          <input
            name="cnp"
            inputMode="numeric"
            maxLength={13}
            required
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-amber/45"
          />
        </label>

        {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        {success && (
          <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-amber to-bronze px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
        >
          {requiresAuth ? "Login pentru cumpărare" : loading ? "Se procesează..." : "Buy ticket"}
        </button>
      </form>
    </div>
  );
}
