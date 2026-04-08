"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isPastEvent } from "@/lib/event-utils";
import { formatCurrency, formatDate } from "@/lib/utils";

type EventItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string | Date;
};

function EventSection({
  title,
  events,
  deletingId,
  onDelete
}: {
  title: string;
  events: EventItem[];
  deletingId: string | null;
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <section className="glass-panel rounded-[2rem] p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Gestionare evenimente</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">{title}</h2>
        </div>
        <span className="rounded-full bg-[#f5efe6] px-4 py-2 text-sm text-ink/65">{events.length} evenimente</span>
      </div>

      <div className="mt-8 grid gap-4">
        {events.map((event) => (
          <article key={event.id} className="rounded-[1.75rem] border border-[#e5d8c5] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl font-semibold text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-ink/52">{formatDate(event.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#fbf5eb] px-4 py-2 text-sm font-medium text-amber">
                  {formatCurrency(event.price)}
                </span>
                <Link href={`/admin/events/${event.id}/edit`} className="text-sm font-medium text-ink">
                  Editeaza
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                >
                  {deletingId === event.id ? "Se sterge..." : "Sterge"}
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink/58">{event.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdminEventsManager({ initialEvents }: { initialEvents: EventItem[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      setLoading(true);
      setError("");

      const response = await fetch("/api/events", { cache: "no-store" });
      const data = await response.json().catch(() => null);

      if (!active) {
        return;
      }

      if (!response.ok) {
        setError(data?.error ?? "Nu am putut incarca evenimentele.");
        setLoading(false);
        return;
      }

      setEvents(data.events ?? []);
      setLoading(false);
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, []);

  const activeEvents = useMemo(
    () => events.filter((event) => !isPastEvent({ date: event.date, startHour: "00:00" })),
    [events]
  );
  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => isPastEvent({ date: event.date, startHour: "00:00" }))
        .sort((left, right) => +new Date(right.date) - +new Date(left.date)),
    [events]
  );

  async function onDelete(id: string) {
    setDeletingId(id);
    setError("");

    const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setError(data?.error ?? "Nu am putut sterge evenimentul.");
      setDeletingId(null);
      return;
    }

    setEvents((current) => current.filter((event) => event.id !== id));
    setDeletingId(null);
  }

  return (
    <div className="grid gap-6">
      {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading && <p className="text-sm text-ink/52">Se incarca evenimentele...</p>}
      <EventSection title="Evenimente active" events={activeEvents} deletingId={deletingId} onDelete={onDelete} />
      <EventSection title="Evenimente trecute" events={pastEvents} deletingId={deletingId} onDelete={onDelete} />
    </div>
  );
}
