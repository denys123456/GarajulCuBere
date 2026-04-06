"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AdminEventFormProps = {
  mode: "create" | "edit";
  event?: {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    date: Date;
    duration: string;
    startHour: string;
  };
};

export function AdminEventForm({ mode, event }: AdminEventFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(formEvent.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(mode === "create" ? "/api/events" : `/api/events/${event?.id}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "A apărut o eroare.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function onDelete() {
    if (!event) {
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/events/${event.id}`, { method: "DELETE" });

    if (!response.ok) {
      setError("Nu am putut șterge evenimentul.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const initialDate = event ? new Date(event.date).toISOString().slice(0, 10) : "";
  const inputClass =
    "rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]";

  return (
    <div className="glass-panel rounded-[2rem] p-8">
      <p className="section-kicker">{mode === "create" ? "New Event" : "Edit Event"}</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">
        {mode === "create" ? "Create premium event" : "Update event"}
      </h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-2 text-sm text-ink/72">
          Title
          <input name="title" required defaultValue={event?.title} className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          General image
          <input name="image" required defaultValue={event?.image} className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-ink/72">
          Description
          <textarea name="description" required defaultValue={event?.description} rows={5} className={inputClass} />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-ink/72">
            Price
            <input type="number" name="price" min={0} required defaultValue={event?.price} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Date
            <input type="date" name="date" required defaultValue={initialDate} className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Start hour
            <input name="startHour" required placeholder="20:00" defaultValue={event?.startHour} className={inputClass} />
          </label>
        </div>
        <label className="grid gap-2 text-sm text-ink/72">
          Duration
          <input name="duration" required defaultValue={event?.duration} className={inputClass} />
        </label>

        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={loading} className="cta-primary">
            {loading ? "Se procesează..." : mode === "create" ? "Add event" : "Save changes"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={onDelete}
              disabled={loading}
              className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700"
            >
              Delete event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
