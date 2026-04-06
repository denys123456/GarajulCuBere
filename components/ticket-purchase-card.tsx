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

  const inputClass =
    "rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]";

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="section-kicker">Buy Ticket</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Secure checkout</h2>
      <p className="mt-3 text-sm leading-7 text-ink/58">
        Completarea datelor este obligatorie. Biletul este asociat contului autentificat și apare imediat în My Tickets.
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
        {success && (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </p>
        )}

        <button type="submit" disabled={loading} className="cta-primary disabled:opacity-60">
          {requiresAuth ? "Login pentru cumpărare" : loading ? "Se procesează..." : "Buy ticket"}
        </button>
      </form>
    </div>
  );
}
